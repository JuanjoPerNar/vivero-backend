import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import postRoutes from './routes/postRoutes.js'
import trefleRoutes from './routes/trefleRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API del vivero funcionando.')
})

app.use('/products', productRoutes)
app.use('/api/trefle', trefleRoutes)
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)    
})