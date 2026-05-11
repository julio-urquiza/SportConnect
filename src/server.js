import app from 'server.js'
import dotenv from 'dotenv'
import connectDatabase from './config/dataBase.js'

connectDatabase()

app.listen(process.env.PORT,()=> console.log(`Server escuchando: ${process.env.PORT}` ))