import Product from "../models/Products.js"

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        console.error('Error al crear el producto', error)
        res.status(400).json({ message: error.message })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.status(200).json(product)
    } catch (error) {
        console.error('Error en getProductById:', error)
        res.status(500).json({ message: 'Error al obtener el producto' })
    }
}