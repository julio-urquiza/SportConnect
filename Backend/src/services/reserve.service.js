import mongoose from "mongoose"
import reserveDao from "../daos/mongoDB/reserve.dao.js"
import reservedSlotDao from "../daos/mongoDB/reservedSlot.dao.js"
import courtDao from "../daos/mongoDB/court.dao.js"
import userDao from "../daos/mongoDB/usuario.dao.js"
import CustomError from "../utils/customError.js"

const MINUTOS_EXPIRACION_PAGO = 15

class ReserveService {
    constructor(dao) {
        this.dao = dao
    }

    /**
     * Crea una reserva en estado "pendiente_pago" y bloquea atómicamente
     * cada hora del rango solicitado mediante ReservedSlot + transacción.
     * Si alguna hora ya está ocupada, no se crea nada (todo o nada).
     *
     * @param {string} idUsuario
     * @param {string} idCancha
     * @param {Date|string} fecha
     * @param {number} horaInicio - Hora de inicio (0-23)
     * @param {number} horaFin - Hora de fin, exclusiva (1-24)
     * @param {number} precio
     * @returns {Promise<object>}
     */
    crearReserva = async (idUsuario, idCancha, fecha, horaInicio, horaFin, precio) => {
        if (!idUsuario) throw new CustomError(400, "ID de usuario es requerido")

        const usuarioExistente = await userDao.getById(idUsuario)
        if (!usuarioExistente) throw new CustomError(404, "Usuario no encontrado")

        if (!idCancha) throw new CustomError(400, "Cancha es requerida")

        const canchaExistente = await courtDao.getById(idCancha)
        if (!canchaExistente) throw new CustomError(404, "Cancha no encontrada")

        if (!fecha) throw new CustomError(400, "Fecha es requerida")

        if (horaInicio === undefined || horaFin === undefined) {
            throw new CustomError(400, "Horario es requerido")
        }
        if (horaFin <= horaInicio) {
            throw new CustomError(400, "La hora de fin debe ser mayor a la hora de inicio")
        }
        if (!precio || precio <= 0) {
            throw new CustomError(400, "Precio debe ser mayor a 0")
        }

        const horas = []
        for (let h = horaInicio; h < horaFin; h++) horas.push(h)

        const idReserva = new mongoose.Types.ObjectId()
        const session = await mongoose.startSession()

        try {
            let reservaCreada

            await session.withTransaction(async () => {
                const slots = horas.map((hora) => ({
                    cancha: idCancha,
                    fecha,
                    hora,
                    reserva: idReserva
                }))

                try {
                    await reservedSlotDao.crearSlots(slots, session)
                } catch (error) {
                    if (error.code === 11000) {
                        throw new CustomError(409, "Alguno de los horarios seleccionados ya está reservado")
                    }
                    throw error
                }

                const expiraEn = new Date(Date.now() + MINUTOS_EXPIRACION_PAGO * 60 * 1000)

                const [reserva] = await this.dao.model.create([{
                    _id: idReserva,
                    usuario: idUsuario,
                    cancha: idCancha,
                    fecha,
                    horaInicio,
                    horaFin,
                    precio,
                    estado: "pendiente_pago",
                    montoTotal: precio,
                    expiraEn
                }], { session })

                reservaCreada = reserva
            })

            return reservaCreada
        } finally {
            await session.endSession()
        }
    }

    /**
     * Cancela una reserva (pendiente_pago o confirmada) y libera
     * sus horas ocupadas de inmediato.
     *
     * @param {string} idReserva
     * @param {string} idUsuarioQueCancela
     * @returns {Promise<object>}
     */
    cancelarReserva = async (idReserva, idUsuarioQueCancela) => {
        if (!idReserva) throw new CustomError(400, "No se recibió la información")

        const reserva = await this.dao.getById(idReserva)
        if (!reserva) throw new CustomError(404, "No se encontró una reserva con esa información")

        if (!["pendiente_pago", "confirmada"].includes(reserva.estado)) {
            throw new CustomError(409, `No se puede cancelar una reserva en estado "${reserva.estado}"`)
        }

        const session = await mongoose.startSession()

        try {
            let reservaActualizada

            await session.withTransaction(async () => {
                await reservedSlotDao.eliminarSlotsDeReserva(idReserva, session)

                reservaActualizada = await this.dao.model.findByIdAndUpdate(
                    idReserva,
                    { estado: "cancelada", canceladoPor: idUsuarioQueCancela },
                    { new: true, session }
                )
            })

            return reservaActualizada
        } finally {
            await session.endSession()
        }
    }

    /**
     * Devuelve las horas disponibles/ocupadas de una cancha en una fecha,
     * consultando ReservedSlot (que refleja el estado real y en tiempo
     * real de ocupación, sin importar el estado de la reserva).
     *
     * @param {string} idCancha
     * @param {Date|string} fecha
     * @returns {Promise<Array<{hora: number, isReserved: boolean}>>}
     */
    getHorarios = async (idCancha, fecha) => {
        if (!idCancha) throw new CustomError(400, "Cancha es requerida")
        if (!fecha) throw new CustomError(400, "Fecha es requerida")

        const canchaExistente = await courtDao.getById(idCancha)
        if (!canchaExistente) throw new CustomError(404, "Cancha no encontrada")

        const fechaConvertida = new Date(fecha)
        const horariosCancha = canchaExistente.horariosDisponibles

        const slotsOcupados = await reservedSlotDao.buscarHorasOcupadas(idCancha, fechaConvertida)
        const horasOcupadas = slotsOcupados.map((s) => s.hora)

        const horasDisponiblesTotales = horariosCancha.reduce((acc, item) => {
            if (item.dia === fechaConvertida.getDay()) {
                acc.push(...item.horas)
            }
            return acc
        }, [])

        let retorno = horasDisponiblesTotales.map((hora) => ({
            hora,
            isReserved: horasOcupadas.includes(hora)
        }))

        const fechaActual = new Date()
        // Comparación por día completo, no solo por día-del-mes
        // (el original comparaba solo getDate(), que falla entre meses distintos)
        if (fechaActual.toDateString() === fechaConvertida.toDateString()) {
            retorno = retorno.map((item) => {
                if (item.hora <= fechaActual.getHours()) item.isReserved = true
                return item
            })
        }

        return retorno
    }

    /**
     * @param {object} filtros
     * @returns {Promise<Array<object>>}
     */
    obtenerReservas = async (filtros = {}) => {
        const query = {}
        if (filtros.usuario) query.usuario = filtros.usuario
        if (filtros.cancha) query.cancha = filtros.cancha
        if (filtros.fecha) query.fecha = filtros.fecha
        if (filtros.estado) query.estado = filtros.estado

        return await this.dao.getAllReserves(query)
    }

    modificarReservas = async (id, data) => {
        return this.dao.update(id, data)
    }

    /**
     * Busca reservas "pendiente_pago" cuyo expiraEn ya pasó, y las
     * pasa a "expirada" liberando sus horas ocupadas. Si una reserva
     * fue confirmada justo antes de procesarla (ej. por un webhook
     * concurrente), el update condicional no la toca.
     *
     * @returns {Promise<{ expiradas: number, revisadas: number }>}
     */
    expirarReservasVencidas = async () => {
        const ahora = new Date()

        const candidatas = await this.dao.model
            .find({ estado: "pendiente_pago", expiraEn: { $lte: ahora } })
            .select("_id")
            .lean()

        let expiradas = 0

        for (const { _id } of candidatas) {
            const session = await mongoose.startSession()

            try {
                await session.withTransaction(async () => {
                    const reservaExpirada = await this.dao.model.findOneAndUpdate(
                        { _id, estado: "pendiente_pago", expiraEn: { $lte: ahora } },
                        { estado: "expirada" },
                        { session }
                    )

                    // Si no matcheó, otra vía (ej. webhook) ya la había resuelto.
                    if (reservaExpirada) {
                        await reservedSlotDao.eliminarSlotsDeReserva(_id, session)
                        expiradas++
                    }
                })
            } catch (error) {
                console.error(`[job:expirarReservas] Error en reserva ${_id}: ${error.message}`)
            } finally {
                await session.endSession()
            }
        }

        return { expiradas, revisadas: candidatas.length }
    }

    /**
     * Busca reservas "pendiente_pago" cuyo expiraEn ya pasó, y las
     * pasa a "expirada" liberando sus horas ocupadas. Si una reserva
     * fue confirmada justo antes de procesarla (ej. por un webhook
     * concurrente), el update condicional no la toca.
     *
     * @returns {Promise<{ expiradas: number, revisadas: number }>}
     */
    expirarReservasVencidas = async () => {
        const ahora = new Date()

        const candidatas = await this.dao.model
            .find({ estado: "pendiente_pago", expiraEn: { $lte: ahora } })
            .select("_id")
            .lean()

        let expiradas = 0

        for (const { _id } of candidatas) {
            const session = await mongoose.startSession()

            try {
                await session.withTransaction(async () => {
                    const reservaExpirada = await this.dao.model.findOneAndUpdate(
                        { _id, estado: "pendiente_pago", expiraEn: { $lte: ahora } },
                        { estado: "expirada" },
                        { session }
                    )

                    // Si no matcheó, otra vía (ej. webhook) ya la había resuelto.
                    if (reservaExpirada) {
                        await reservedSlotDao.eliminarSlotsDeReserva(_id, session)
                        expiradas++
                    }
                })
            } catch (error) {
                console.error(`[job:expirarReservas] Error en reserva ${_id}: ${error.message}`)
            } finally {
                await session.endSession()
            }
        }

        return { expiradas, revisadas: candidatas.length }
    }

    /**
     * Historial de pagos de todas las canchas de un dueño.
     * @param {string} idDuenio
     * @param {object} [filtros]
     * @returns {Promise<Array<object>>}
     */
    obtenerHistorialPagos = async (idDuenio, filtros = {}) => {
        if (!idDuenio) throw new CustomError(400, "ID de dueño es requerido")

        const canchas = await courtDao.getAllCourts({ duenio: idDuenio })
        const idsCanchas = canchas.map((c) => c._id)

        const query = { cancha: { $in: idsCanchas } }

        if (filtros.estado) {
            query.estado = filtros.estado
        } else {
            query.estado = { $in: ["confirmada", "reembolsada", "finalizada"] }
        }

        if (filtros.cancha) {
            const perteneceAlDuenio = idsCanchas.some((id) => String(id) === String(filtros.cancha))
            if (!perteneceAlDuenio) {
                throw new CustomError(403, "Esa cancha no te pertenece")
            }
            query.cancha = filtros.cancha
        }

        return await reserveDao.getHistorialPagos(query)
    }
}

export default new ReserveService(reserveDao)