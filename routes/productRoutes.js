import express from 'express'
import Product from '../models/Products.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.error('Error al obtener los productos:', error)
        res.status(500).json({message: 'Error al obtener los productos'})
    }
})

export default router