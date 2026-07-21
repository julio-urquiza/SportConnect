import { createContext, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/authService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginRequest({ email, password });

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      return data.user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, role) {
    setLoading(true);
    setError(null);

    try {
      const data = await registerRequest({
        email,
        password,
        role,
      });

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      return data.user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutRequest();

      setUser(null);

      localStorage.removeItem("user");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginRequest: login,
        registerRequest: register,
        logoutRequest: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
