import paymentService from "../services/payment.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class PaymentController {

    crearPreferencia = async (req, res) => {
        const { reservaId } = req.body
        const resultado = await paymentService.crearPreferencia(reservaId, req.user._id)

        res.status(201).json({ status: "success", ...resultado })
    }

    /**
     * Siempre responde 200 salvo firma inválida. Errores de negocio
     * (reserva no encontrada, cuenta no conectada, etc.) se loguean
     * pero NO se propagan como error HTTP: MP reintenta agresivamente
     * cualquier respuesta que no sea 2xx, y esos casos ya quedaron
     * auditados en WebhookEvent — no ganamos nada reintentándolos así.
     */
    webhook = async (req, res) => {
        try {
            await paymentService.procesarWebhook(req.query, req.headers, req.body)
        } catch (error) {
            if (error.statusCode === 401) {
                return res.status(401).json({ error: error.message })
            }
            console.error("Error procesando webhook de Mercado Pago:", error.message)
        }

        res.status(200).send("ok")
    }

    crearReembolso = async (req, res) => {
        const { reservaId, monto } = req.body
        const resultado = await paymentService.crearReembolso(reservaId, req.user._id, monto)

        res.status(200).json({ status: "success", ...resultado })
    }

    obtenerEstado = async (req, res) => {
        const { reservaId } = req.params
        const estado = await paymentService.obtenerEstado(reservaId, req.user._id)

        res.status(200).json({ status: "success", ...estado })
    }
}

export default wrapRoutes(new PaymentController())