import express from "express"
import cors from 'cors'
import 'dotenv/config'
import indexRouter from "./routes/index.router.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api", indexRouter)

export default app