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