import api from "./api"

export const conectarMPRequest = () => {
    return api.post("/api/mercadopago/connect")
}

export const estadoMPRequest = () => {
    return api.get("/api/mercadopago/status")
}

export const desconectarMPRequest = () => {
    return api.post("/api/mercadopago/disconnect")
}   