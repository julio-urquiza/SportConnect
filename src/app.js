import express from "express"
import cors from 'cors'
import 'dotenv/config'
import indexRouter from "./routes/index.router.js"
import cookieParser from "cookie-parser"
import passport from "./config/passport.jwt.js"

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(passport.initialize())

app.use("/api", indexRouter)

export default app