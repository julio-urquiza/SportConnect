/**
 * Middleware factory: verifica que el usuario autenticado (req.user)
 * tenga alguno de los roles permitidos.
 *
 * ASUNCIÓN: tu middleware de autenticación existente ya corrió antes
 * que este y dejó el usuario logueado en `req.user` (con al menos
 * `_id` y `role`). Si tu middleware usa otro nombre de propiedad
 * (ej. req.usuario), avisame y lo ajusto.
 *
 * @param {...string} rolesPermitidos
 * @returns {import("express").RequestHandler}
 */
export const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" })
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({
        error: "No tenés permisos para acceder a este recurso"
      })
    }

    next()
  }
}