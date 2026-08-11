import { useState, useCallback } from "react"
import { conectarMPRequest, estadoMPRequest, desconectarMPRequest } from "../services/mercadoPago.service"

export const useMercadoPago = () => {
    const [estado, setEstado] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const cargarEstado = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await estadoMPRequest()
            setEstado(response)
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo consultar el estado de Mercado Pago")
        } finally {
            setLoading(false)
        }
    }, [])

    const conectar = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await conectarMPRequest()
            window.location.href = response.url
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo iniciar la conexión con Mercado Pago")
            setLoading(false)
        }
    }

    const desconectar = async () => {
        setLoading(true)
        setError(null)
        try {
            await desconectarMPRequest()
            await cargarEstado()
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo desconectar la cuenta")
        } finally {
            setLoading(false)
        }
    }

    return { estado, loading, error, cargarEstado, conectar, desconectar }
}