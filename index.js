import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('API del vivero funcionando')
})

app.use('/products', productRoutes)

app.listen(PORT, () => {
    console.log(`Servidor conrriendo en http://localhost:${PORT}`)    
})