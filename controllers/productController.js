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
        const { category } = req.query
        const filter = category ? { category } : {}

        const products = await Product.find(filter)
        res.status(200).json(products)
    } catch (error) {
        console.error('Error al obtener productos', error);
        
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

export const updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.error('Error al actualizar el producto', error)
        res.status(500).json({ message: 'Error al actualizar el producto' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.status(200).json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
        console.error('Error al eliminar el producto', error.message)
        res.status(500).json({ message: 'Error al eliminar el producto' })
        
    }
}