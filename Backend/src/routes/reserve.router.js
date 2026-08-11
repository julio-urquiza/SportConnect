import { Router } from "express";
import reserveController from "../controllers/reserve.controller.js";
import passport from "passport";
import { verificarRol } from "../middlewares/verificarRol.js"

const router= Router()

router.put("/cancelar",passport.authenticate("jwt", { session: false }), reserveController.cancelarReserva)
router.post("/", passport.authenticate("jwt", { session: false }), reserveController.create);
router.get("/horarios", reserveController.getHorarios)
router.get("/duenio", passport.authenticate("jwt", { session: false }), reserveController.obtenerReservasDuenio)
router.get("/", reserveController.obtenerReservas)
router.put("/",passport.authenticate("jwt", { session: false }), reserveController.modificarReserva)
<<<<<<< HEAD
router.get(
    "/historial-pagos",
    passport.authenticate("jwt", { session: false }),
    verificarRol("owner"),
    reserveController.obtenerHistorialPagos
)
export default router
=======


export default router
>>>>>>> a05d156c71aeb117e5cafefa5642559470a52285
