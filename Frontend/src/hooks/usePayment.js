import { useState } from "react"
import { crearPreferenciaRequest, estadoPagoRequest, reembolsoRequest } from "../services/payment.service"

export const usePayment = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const pagarReserva = async (reservaId) => {
        setLoading(true)
        setError(null)
        try {
            const response = await crearPreferenciaRequest(reservaId)
            window.location.href = response.initPoint
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo generar el pago")
            setLoading(false)
        }
    }

    const consultarEstado = async (reservaId) => {
        try {
            return await estadoPagoRequest(reservaId)
        } catch {
            return null
        }
    }

    const reembolsar = async (reservaId, monto) => {
        setLoading(true)
        setError(null)
        try {
            const response = await reembolsoRequest(reservaId, monto)
            return response
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo procesar el reembolso")
            return null
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, pagarReserva, consultarEstado, reembolsar }
}