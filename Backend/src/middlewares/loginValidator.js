import { body } from "express-validator"

const loginValidation = [
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail()
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatorio")
        .isLength({ min: 8 }),
]
export default loginValidation