import { useState } from "react"
import { loginRequest, registerRequest, logoutRequest } from '../services/authService.js'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loginReq(email, password) {
    setLoading(true)
    setError(null)
    try {
      const data = await loginRequest({email, password})
      localStorage.setItem("user", JSON.stringify(data.user))
      return data.user
    } catch (err) {
      setError(err.message)
      return null;
    } finally {
      setLoading(false)
    }
  }

  async function registerReq(email, password, role) {
    setLoading(true)
    setError(null)
    try {
      const data = await registerRequest({email, password, role})
      localStorage.setItem("user", JSON.stringify(data.user))
      return data.user
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try{
      const data = await logoutRequest()
      if(!data) throw new Error("Error al cerrar sesión")
      localStorage.removeItem("user")
    } catch (err) {
      setError(err.message)
    }
  }

  return { logout, loginReq, registerReq, loading, error }
}