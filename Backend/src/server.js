import app from './app.js'
import dotenv from 'dotenv'
import connectDatabase from './config/dataBase.js'
import { iniciarJobExpiracionReservas } from "./jobs/expirarReservas.job.js"
import { iniciarJobRenovacionTokensMP } from "./jobs/renovarTokens.job.js"

await connectDatabase()

iniciarJobExpiracionReservas()
iniciarJobRenovacionTokensMP()

app.listen(process.env.PORT, () => console.log(`Server escuchando: ${process.env.PORT}`))