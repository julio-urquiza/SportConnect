const request = async (endpoint, { method = "POST", body ,credentials=undefined } = {}) => {
  const headers = {
    "Content-Type": "application/json",
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    credentials : "include",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en la solicitud")
  }

  return res.json();
}

export const loginRequest = (body) =>
  request("/api/user/login", { body })

export const registerRequest = (body) =>
  request("/api/user/register", { body })

export const meRequest = () =>
  request("/api/user/me", {method: "GET", credentials:"include"})

export const logoutRequest = () =>
  request("/api/user/logout", {method: "POST"})
