import app from './app.js'
import dotenv from 'dotenv'
import connectDatabase from './config/dataBase.js'

await connectDatabase()
app.listen(process.env.PORT,()=> console.log(`Server escuchando: ${process.env.PORT}`))