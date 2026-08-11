import { Router } from "express"
import userRouter from './user.router.js'
import courtRouter from './court.router.js'
import reserveRouter from './reserve.router.js'
import mercadoPagoRouter from "./mercadoPago.router.js"
import paymentRouter from "./payment.router.js"
import errorMiddleware from "../middlewares/errorMiddleware.js"

const router = Router()

router.use('/user', userRouter)
router.use('/court', courtRouter)
router.use('/reserves', reserveRouter)
router.use("/mercadopago", mercadoPagoRouter)
router.use("/payments", paymentRouter)

router.use(errorMiddleware)

export default router