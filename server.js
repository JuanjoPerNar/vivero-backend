import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import postRoutes from './routes/postRoutes.js'
import trefleRoutes from './routes/trefleRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'

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
app.use('/activities', activityRoutes)
app.use('/contacts', contactRoutes)
app.use('/users', userRoutes)
app.use('/services', serviceRoutes)

export default app
