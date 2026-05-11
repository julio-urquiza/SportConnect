import express from "express"
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/",()=> console.log('test'))

export default app