import { Router } from "express"
import userController from "../controllers/user.controller.js"
import registerValidation from "../middlewares/registerValidator.js"
import loginValidation from "../middlewares/loginValidator.js"
import validationMiddleware from "../middlewares/validationMiddleware.js"
import passport from "passport"

const router = Router()

router.post("/register", registerValidation, validationMiddleware, userController.register)
router.post("/login", loginValidation, validationMiddleware, userController.login)
router.post("/logout", passport.authenticate("jwt", { session: false }), userController.logout)
router.get("/me", passport.authenticate("jwt", { session: false }), userController.me)

export default router