import { useState, useCallback } from "react"
import { historialPagosRequest } from "../services/reserve.service"

export const useHistorialPagos = () => {
    const [historial, setHistorial] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const cargarHistorial = useCallback(async (filtros = {}) => {
        setLoading(true)
        setError(null)
        try {
            const response = await historialPagosRequest(filtros)
            setHistorial(response.historial)
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo cargar el historial de pagos")
        } finally {
            setLoading(false)
        }
    }, [])

    return { historial, loading, error, cargarHistorial }
}