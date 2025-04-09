import express from 'express'
import Product from '../models/Products.js'
import { createProduct } from '../controllers/productController.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { category } = req.query
        const query = category ? { category } : {}
        const products = await Product.find(query)
        res.json(products)
    } catch (error) {
        console.error('Error al obtener los productos:', error)
        res.status(500).json({message: 'Error al obtener los productos'})
    }
})

router.post('/', createProduct)

export default router