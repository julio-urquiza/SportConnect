import crypto from "crypto"
import mongoose from "mongoose"
import reserveDao from "../daos/mongoDB/reserve.dao.js"
import reservedSlotDao from "../daos/mongoDB/reservedSlot.dao.js"
import courtDao from "../daos/mongoDB/court.dao.js"
import mercadoPagoDao from "../daos/mongoDB/mercadoPago.dao.js"
import webhookEventDao from "../daos/mongoDB/webhook.dao.js"
import CustomError from "../utils/customError.js"

const MP_PREFERENCES_URL = "https://api.mercadopago.com/checkout/preferences"
const MP_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments"
const PORCENTAJE_COMISION = Number(process.env.SPORTCONNECT_COMISION_PORCENTAJE || 0)

class PaymentService {

    /**
     * @param {string} idReserva
     * @param {string} idUsuario
     * @returns {Promise<{ initPoint: string, preferenceId: string }>}
     */
    crearPreferencia = async (idReserva, idUsuario) => {
        if (!idReserva) throw new CustomError(400, "reservaId es requerido")

        const reserva = await reserveDao.getById(idReserva)
        if (!reserva) throw new CustomError(404, "Reserva no encontrada")

        if (String(reserva.usuario) !== String(idUsuario)) {
            throw new CustomError(403, "Esta reserva no te pertenece")
        }

        if (reserva.estado !== "pendiente_pago") {
            throw new CustomError(
                409,
                `La reserva está en estado "${reserva.estado}", no se puede generar un pago`
            )
        }

        const cancha = await courtDao.getById(reserva.cancha)
        if (!cancha) throw new CustomError(404, "La cancha de esta reserva ya no existe")

        const cuentaMP = await mercadoPagoDao.buscarCuentaConTokensPorUsuario(cancha.duenio)
        if (!cuentaMP) {
            throw new CustomError(422, "El dueño de esta cancha todavía no conectó Mercado Pago")
        }

        const accessToken = cuentaMP.getDecryptedAccessToken()
        const montoTotal = reserva.montoTotal ?? reserva.precio
        const comisionSportConnect = Math.round(montoTotal * (PORCENTAJE_COMISION / 100) * 100) / 100

        const backendUrl = process.env.BACKEND_URL
        const frontendUrl = process.env.FRONTEND_URL

        const body = {
            items: [{
                id: String(cancha._id),
                title: `Reserva - ${cancha.nombre}`,
                description: `${new Date(reserva.fecha).toLocaleDateString("es-AR")} de ${Math.min(...reserva.horarios.horas)}:00 a ${Math.max(...reserva.horarios.horas) + 1}:00`, 
                quantity: 1,
                currency_id: "ARS",
                unit_price: montoTotal
            }],
            external_reference: String(reserva._id),
            // reservaId acá es lo que me permite, en el webhook, saber
            // qué reserva/vendedor corresponde SIN tener que adivinarlo.
            notification_url: `${backendUrl}/api/payments/webhook?reservaId=${reserva._id}`,
            back_urls: {
                success: `${frontendUrl}/reservas?pago=exitoso`,
                failure: `${frontendUrl}/reservas?pago=fallido`,
                pending: `${frontendUrl}/reservas?pago=pendiente`
            },
            auto_return: "approved",
            marketplace_fee: comisionSportConnect
        }

        const response = await fetch(MP_PREFERENCES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new CustomError(
                502,
                `Error al crear la preferencia de pago: ${data.message || response.statusText}`
            )
        }

        await reserveDao.update(reserva._id, {
            mpPreferenceId: data.id,
            comisionSportConnect
        })

        return { initPoint: data.init_point, preferenceId: data.id }
    }

    /**
     * Valida la firma HMAC del webhook (header x-signature) contra
     * el manifest oficial de Mercado Pago.
     *
     * @param {string} signature - Header x-signature completo
     * @param {string} requestId - Header x-request-id
     * @param {string} dataId - data.id (del query string de la notificación)
     * @returns {boolean}
     */
    validarFirma = (signature, requestId, dataId) => {
        if (!signature || !requestId || !dataId || !process.env.MP_WEBHOOK_SECRET) {
            return false
        }

        const partes = Object.fromEntries(
            signature.split(",").map((parte) => {
                const i = parte.indexOf("=")
                return [parte.slice(0, i).trim(), parte.slice(i + 1).trim()]
            })
        )

        const { ts, v1: hashRecibido } = partes
        if (!ts || !hashRecibido) return false

        const manifest = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${ts};`

        const hashCalculado = crypto
            .createHmac("sha256", process.env.MP_WEBHOOK_SECRET)
            .update(manifest)
            .digest("hex")

        const bufA = Buffer.from(hashCalculado, "hex")
        const bufB = Buffer.from(hashRecibido, "hex")

        if (bufA.length !== bufB.length) return false

        return crypto.timingSafeEqual(bufA, bufB)
    }

    /**
     * Procesa una notificación webhook de Mercado Pago: valida firma,
     * garantiza idempotencia, consulta el pago real con el token del
     * vendedor correspondiente, y actualiza la reserva.
     *
     * @param {object} query - req.query
     * @param {object} headers - req.headers
     * @param {object} body - req.body
     * @returns {Promise<{ procesado?: boolean, yaProcesado?: boolean, ignorado?: boolean }>}
     */
    procesarWebhook = async (query, headers, body) => {
        const tipo = query.type || body?.type
        if (tipo && tipo !== "payment") {
            return { ignorado: true }
        }

        const dataId = query["data.id"] || body?.data?.id
        if (!dataId) return { ignorado: true }

        const signature = headers["x-signature"]
        const requestId = headers["x-request-id"]

        if (!this.validarFirma(signature, requestId, dataId)) {
            throw new CustomError(401, "Firma de webhook inválida")
        }

        const idNotificacion = body?.id ? String(body.id) : `${dataId}-${requestId}`

        const eventoExistente = await webhookEventDao.buscarPorIdNotificacion(idNotificacion)
        if (eventoExistente?.procesado) {
            return { yaProcesado: true }
        }

        const evento = eventoExistente || await webhookEventDao.crear({
            idNotificacion,
            tipo: tipo || "payment",
            dataId: String(dataId),
            payload: body
        })

        const reservaId = query.reservaId
        if (!reservaId) {
            throw new CustomError(400, "Falta reservaId en la URL de notificación")
        }

        const reserva = await reserveDao.getById(reservaId)
        if (!reserva) throw new CustomError(404, "Reserva no encontrada para este webhook")

        const cancha = await courtDao.getById(reserva.cancha)
        if (!cancha) throw new CustomError(404, "Cancha no encontrada para este webhook")

        const cuentaMP = await mercadoPagoDao.buscarCuentaConTokensPorUsuario(cancha.duenio)
        if (!cuentaMP) {
            throw new CustomError(422, "Cuenta de Mercado Pago no disponible para reconciliar el pago")
        }

        const accessToken = cuentaMP.getDecryptedAccessToken()

        const response = await fetch(`${MP_PAYMENTS_URL}/${dataId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        const pago = await response.json()

        if (!response.ok) {
            throw new CustomError(
                502,
                `No se pudo consultar el pago en Mercado Pago: ${pago.message || response.statusText}`
            )
        }

        if (String(pago.external_reference) !== String(reserva._id)) {
            throw new CustomError(409, "El pago no corresponde a esta reserva (external_reference no coincide)")
        }

        await this.actualizarReservaSegunPago(reserva, pago)
        await webhookEventDao.marcarProcesado(evento._id)

        return { procesado: true }
    }

    /**
     * Aplica el estado real del pago (consultado en MP) a la reserva.
     * @param {object} reserva
     * @param {object} pago - Respuesta de GET /v1/payments/{id}
     */
    actualizarReservaSegunPago = async (reserva, pago) => {
        const datosBase = {
            mpPaymentId: String(pago.id),
            mpStatus: pago.status,
            mpStatusDetail: pago.status_detail
        }

        if (pago.status === "approved") {
            await reserveDao.update(reserva._id, {
                ...datosBase,
                estado: "confirmada",
                pagadoEn: new Date()
            })
            return
        }

        if (["rejected", "cancelled"].includes(pago.status)) {
            const session = await mongoose.startSession()
            try {
                await session.withTransaction(async () => {
                    await reservedSlotDao.eliminarSlotsDeReserva(reserva._id, session)
                    await reserveDao.model.findByIdAndUpdate(
                        reserva._id,
                        {
                            ...datosBase,
                            estado: "cancelada",
                            motivoCancelacion: "Pago rechazado o cancelado en Mercado Pago"
                        },
                        { session }
                    )
                })
            } finally {
                await session.endSession()
            }
            return
        }

        // pending / in_process: la reserva sigue en pendiente_pago,
        // solo registramos el detalle para mostrarlo en el frontend.
        await reserveDao.update(reserva._id, datosBase)
    }

    /**
     * Solicita un reembolso (total o parcial) de una reserva confirmada,
     * usando el access_token del mismo vendedor que recibió el pago.
     * Libera el slot ocupado al confirmarse el reembolso.
     *
     * @param {string} idReserva
     * @param {string} idUsuarioSolicitante - Dueño que pide el reembolso
     * @param {number} [monto] - Monto a reembolsar; si se omite, es total
     * @returns {Promise<{ refundId: string, monto: number }>}
     */
    crearReembolso = async (idReserva, idUsuarioSolicitante, monto) => {
        const reserva = await reserveDao.getById(idReserva)
        if (!reserva) throw new CustomError(404, "Reserva no encontrada")

        if (reserva.estado !== "confirmada") {
            throw new CustomError(
                409,
                `No se puede reembolsar una reserva en estado "${reserva.estado}"`
            )
        }

        if (!reserva.mpPaymentId) {
            throw new CustomError(422, "Esta reserva no tiene un pago asociado para reembolsar")
        }

        const cancha = await courtDao.getById(reserva.cancha)
        if (!cancha) throw new CustomError(404, "La cancha de esta reserva ya no existe")

        if (String(cancha.duenio) !== String(idUsuarioSolicitante)) {
            throw new CustomError(403, "No sos el dueño de esta cancha")
        }

        if (monto && monto > reserva.montoTotal) {
            throw new CustomError(400, "El monto a reembolsar no puede superar el monto total de la reserva")
        }

        const cuentaMP = await mercadoPagoDao.buscarCuentaConTokensPorUsuario(cancha.duenio)
        if (!cuentaMP) {
            throw new CustomError(422, "No hay una cuenta de Mercado Pago conectada para procesar el reembolso")
        }

        const accessToken = cuentaMP.getDecryptedAccessToken()

        const response = await fetch(`${MP_PAYMENTS_URL}/${reserva.mpPaymentId}/refunds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: monto ? JSON.stringify({ amount: monto }) : JSON.stringify({})
        })

        const data = await response.json()

        if (!response.ok) {
            throw new CustomError(
                502,
                `Error al procesar el reembolso: ${data.message || response.statusText}`
            )
        }

        const session = await mongoose.startSession()
        try {
            await session.withTransaction(async () => {
                await reservedSlotDao.eliminarSlotsDeReserva(reserva._id, session)
                await reserveDao.model.findByIdAndUpdate(
                    reserva._id,
                    {
                        estado: "reembolsada",
                        mpStatus: "refunded",
                        montoReembolsado: monto || reserva.montoTotal,
                        reembolsadoEn: new Date(),
                        reembolsadoPor: idUsuarioSolicitante
                    },
                    { session }
                )
            })
        } finally {
            await session.endSession()
        }

        return { refundId: data.id, monto: monto || reserva.montoTotal }
    }

    /**
     * @param {string} idReserva
     * @param {string} idUsuario - Debe ser el dueño de la reserva
     * @returns {Promise<{ estado: string, mpStatus?: string, mpStatusDetail?: string }>}
     */
    obtenerEstado = async (idReserva, idUsuario) => {
        const reserva = await reserveDao.getById(idReserva)
        if (!reserva) throw new CustomError(404, "Reserva no encontrada")

        if (String(reserva.usuario) !== String(idUsuario)) {
            throw new CustomError(403, "Esta reserva no te pertenece")
        }

        return {
            estado: reserva.estado,
            mpStatus: reserva.mpStatus,
            mpStatusDetail: reserva.mpStatusDetail
        }
    }
}

export default new PaymentService()