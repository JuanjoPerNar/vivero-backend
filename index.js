import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API del vivero funcionando.')
})

app.use('/products', productRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)    
})