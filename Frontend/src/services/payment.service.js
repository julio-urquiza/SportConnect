import api from "./api"

export const crearPreferenciaRequest = (reservaId) => {
    return api.post("/api/payments/create", { reservaId })
}

export const estadoPagoRequest = (reservaId) => {
    return api.get(`/api/payments/status/${reservaId}`)
}

export const reembolsoRequest = (reservaId, monto) => {
    return api.post("/api/payments/refund", { reservaId, monto })
}