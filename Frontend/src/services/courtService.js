import api from "./api";

// Obtener todos los courts con filtros
export const getCourtsRequest = (filters = {}) => {
  return api.get("/api/court", { params: filters })
};

// Obtener un court por id
export const getCourtByIdRequest = (id) => {
  return api.get(`/api/court/${id}`)
};

// Crear un court
export const createCourtRequest = (data) => {
  return api.post(`/api/court`, data)
};

// Actualizar un court por id
export const updateCourtRequest = (id, data) => {
  return api.put(`/api/court/${id}`, data)
};

