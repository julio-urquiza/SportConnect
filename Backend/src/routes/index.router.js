import { Router } from "express"
import userRouter from './user.router.js'
import courtRouter from './court.router.js'
import reserveRouter from './reserve.router.js'
import mercadoPagoRouter from "./mercadoPago.router.js"
import paymentRouter from "./payment.router.js"
import errorMiddleware from "../middlewares/errorMiddleware.js"
import uploadRouter from "./upload.router.js"

const router = Router()

router.use('/user', userRouter)
router.use('/court', courtRouter)
router.use('/reserves', reserveRouter)
<<<<<<< HEAD
router.use("/mercadopago", mercadoPagoRouter)
router.use("/payments", paymentRouter)

=======
router.use("/upload", uploadRouter);
>>>>>>> a05d156c71aeb117e5cafefa5642559470a52285
router.use(errorMiddleware)

export default router