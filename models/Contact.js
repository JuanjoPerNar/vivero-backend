import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    trim: true,
    match: [/\S+@\S+\.\S+/, "El correo electrónico no es válido"]
  },
  message: {
    type: String,
    required: [true, "El mensaje no puede estar vacío"],
    maxlength: [1000, "El mensaje no puede superar los 1000 caracteres"]
  }
}, {
  timestamps: true
})

const Contact = mongoose.model("Contact", contactSchema)

export default Contact
