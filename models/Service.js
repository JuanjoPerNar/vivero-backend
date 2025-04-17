import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título del servicio es obligatorio"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    maxlength: [300, "La descripción no puede superar los 300 caracteres"]
  },
  type: {
    type: String,
    required: [true, "El tipo de servicio es obligatorio"],
    enum: {
      values: [
        "jardines", 
        "verticales", 
        "mantenimiento", 
        "riego", 
        "asesoramiento", 
        "alquiler", 
        "reciclaje", 
        "rescate"
      ],
      message: "Tipo de servicio no válido"
    }
  },
  image: {
    type: String,
    required: [true, "La imagen del servicio es obligatoria"]
  }
}, {
  timestamps: true
})

const Service = mongoose.model("Service", serviceSchema)

export default Service
