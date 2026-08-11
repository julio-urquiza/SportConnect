import { Router } from "express"
import mercadoPagoController from "../controllers/mercadoPago.controller.js"
import { verificarRol } from "../middlewares/verificarRol.js"
// AJUSTAR: importar tu middleware de autenticación real
import { verificarToken } from "../middlewares/verificarToken.js"

const router = Router()

router.post(
  "/connect",
  verificarToken,
  verificarRol("owner"),
  mercadoPagoController.conectar
)

// Sin verificarToken: Mercado Pago redirige acá directamente,
// no trae el JWT del dueño. La identidad se resuelve vía "state".
router.get("/oauth/callback", mercadoPagoController.callback)

router.get(
  "/status",
  verificarToken,
  verificarRol("owner"),
  mercadoPagoController.estado
)

router.post(
  "/disconnect",
  verificarToken,
  verificarRol("owner"),
  mercadoPagoController.desconectar
)

export default router