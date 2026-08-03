import { Router } from "express";
import reserveController from "../controllers/reserve.controller.js";
import passport from "passport";

const router= Router()

// router.put("/cancelar",passport.authenticate("jwt", { session: false }), reserveController.cancelarReserva)
router.put("/cancelar", reserveController.cancelarReserva)
router.post("/", passport.authenticate("jwt", { session: false }), reserveController.create);
router.get("/horarios", reserveController.getHorarios)
router.get("/", reserveController.obtenerReservas)

export default router