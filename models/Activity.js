import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título de la actividad es obligatorio"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    maxlength: [500, "La descripción no puede superar los 500 caracteres"]
  },
  type: {
    type: String,
    required: [true, "El tipo de actividad es obligatorio"],
    enum: {
      values: ["curso", "taller", "exposición", "otro"],
      message: "El tipo debe ser: curso, taller, exposición u otro"
    }
  },
  date: {
    type: Date,
    required: [true, "La fecha del evento es obligatoria"]
  },
  location: {
    type: String,
    required: [true, "La ubicación es obligatoria"]
  },
  image: {
    type: String,
    required: [true, "La imagen de la actividad es obligatoria"]
  }
}, {
  timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

export default Activity
