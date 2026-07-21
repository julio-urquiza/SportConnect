import express from "express"
import cors from 'cors'
import 'dotenv/config'
import indexRouter from "./routes/index.router.js"
import cookieParser from "cookie-parser"
import passport from "./config/passport.jwt.js"

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://sportconnectg.netlify.app"
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(passport.initialize())

app.use("/api", indexRouter)

export default app