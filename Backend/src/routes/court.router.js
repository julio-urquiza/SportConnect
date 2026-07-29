import { Router } from "express"
import courtController from "../controllers/court.controller.js"

const router = Router()

router.get("/:id", courtController.getById)
router.get("/", courtController.getCourts)
router.put("/:id",courtController.updateById)
router.post("/", courtController.create)

export default router