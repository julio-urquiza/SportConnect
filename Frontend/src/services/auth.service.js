import api from "./api";
// Login
export const loginRequest = (data) => {
  return api.post("/api/user/login", data)
};

// Registro
export const registerRequest = (data) => {
  return api.post("/api/user/register", data)
};

// Obtener usuario autenticado
export const meRequest = () => {
  return api.get("/api/user/me")
};

// Logout
export const logoutRequest = () => {
  return api.post("/api/user/logout")
};