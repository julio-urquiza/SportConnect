import { Router } from "express"
import passport from "../config/passport.jwt.js"
import { verificarRol } from "../middlewares/verificarRol.js"
import paymentController from "../controllers/payment.controller.js"

const router = Router()

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    paymentController.crearPreferencia
)

router.post("/webhook", paymentController.webhook)

router.get(
    "/status/:reservaId",
    passport.authenticate("jwt", { session: false }),
    paymentController.obtenerEstado
)

router.post(
    "/refund",
    passport.authenticate("jwt", { session: false }),
    verificarRol("owner"),
    paymentController.crearReembolso
)

export default router