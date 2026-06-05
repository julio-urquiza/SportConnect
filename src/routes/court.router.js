import { Router } from "express"

import courtController from "../controllers/court.controller.js";

const router = Router();

// Declarar el endpoint GET /:id
router.get("/:id", courtController.getById);
// PRUEBA DEL POST
router.post("/", courtController.create);

export default router