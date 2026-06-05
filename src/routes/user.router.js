import { Router } from "express"
import userController from "../controllers/user.controller.js"
import registerValidation from "../middlewares/registerValidator.js"
import loginValidation from "../middlewares/loginValidator.js"
import validationMiddleware from "../middlewares/validationMiddleware.js"

const router = Router()

router.post("/register", registerValidation, validationMiddleware, userController.register)
router.post("/login", loginValidation, validationMiddleware, userController.login)
router.get("/logout", userController.logout)
// router.post("/current", userController.me)

export default router