import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio']
  },
  description: {
    type: String,
    required: [true, 'La descripción del producto es obligatoria'],
    maxlength: [300, 'La descripción no puede superar los 300 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio'],
    min: [0.01, 'El precio debe ser mayor que cero']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: ['planta', 'maceta', 'herramienta', 'fertilizante', 'kit'],
      message: 'La categoría debe ser: planta, maceta, herramienta, fertilizante o kit'
    }
  },
  size: {
    type: String,
    enum: {
      values: ['pequeña', 'mediana', 'grande'],
      message: 'La talla debe ser: pequeña, mediana o grande'
    },
    default: null
  },
  image: {
    type: String,
    required: [true, 'La imagen del producto es obligatoria']
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
