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
    return api.put(`/api/reserves/cancelar`, null, {params: { id }})
}