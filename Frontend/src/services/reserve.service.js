import api from "./api";

// Crear un court
export const createCourtRequest = (data) => {
  return api.post(`/api/reserves`, data)
};
