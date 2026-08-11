import jwt from "jsonwebtoken"

/**
 * Middleware de autenticación: valida el JWT y deja el payload
 * decodificado en req.user (_id, email, role).
 *
 * Acepta el token desde:
 *  - Header "Authorization: Bearer <token>" (prioridad)
 *  - Cookie "token" (fallback, por si el frontend usa cookies)
 *
 * Usa CLAVE_JWT (confirmado como la variable realmente utilizada
 * al firmar, ver generateToken.js).
 *
 * @type {import("express").RequestHandler}
 */
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const tokenDesdeHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null

const tokenDesdeCookie = req.cookies?.Token

  const token = tokenDesdeHeader || tokenDesdeCookie

  if (!token) {
    return res.status(401).json({ error: "No se proporcionó un token de autenticación" })
  }

  try {
    const payload = jwt.verify(token, process.env.CLAVE_JWT)
    req.user = payload
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "El token expiró, iniciá sesión nuevamente" })
    }
    return res.status(401).json({ error: "Token inválido" })
  }
}