import { Router } from "express"
import courtController from "../controllers/court.controller.js"

const router = Router()

router.get("/search", courtController.filtrarPorUbicacion)
router.get("/:id", courtController.getById);
router.post("/", courtController.create);

export default router