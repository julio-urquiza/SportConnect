import { Router } from "express";
import reserveController from "../controllers/reserve.controller.js";
import passport from "passport";

const router= Router()

router.patch("/cancelar",reserveController.cancelarReserva)
router.post("/", passport.authenticate("jwt", { session: false }), reserveController.create);

export default router