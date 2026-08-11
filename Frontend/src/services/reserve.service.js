import api from "./api";

export const createCourtRequest = (data) => {
    return api.post(`/api/reserves`, data)
};

export const getHoursRequest = (data) => {
    return api.get(`/api/reserves/horarios`, { params: data })
};

export const getAllReservesRequest = (data) => {
    return api.get(`/api/reserves`, { params: data })
}

export const cancelReserveRequest = (id) => {
    return api.put(`/api/reserves/cancelar`, null, { params: { id } })
}

export const updateReserveRequest = (id, data) => {
    return api.put(`/api/reserves`, data, { params: { id } })
}

export const historialPagosRequest = (filtros = {}) => {
    return api.get("/api/reserves/historial-pagos", { params: filtros })
}

export const getReserveOwnerRequest = (data) => {
    return api.get(`/api/reserves/duenio`, { params: data })
}