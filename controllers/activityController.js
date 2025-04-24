import Activity from "../models/Activity.js"

export const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body)
    await activity.save()
    res.status(201).json(activity)
  } catch (error) {
    console.error("Error al crear la actividad:", error)
    res.status(400).json({ message: error.message })
  }
}

export const getAllActivities = async (req, res) => {
  try {
    const { tipo } = req.query
    const filter = tipo ? { type: tipo } : {}

    const activities = await Activity.find(filter)
    res.status(200).json(activities)
  } catch (error) {
    console.error("Error al obtener actividades:", error)
    res.status(500).json({ message: "Error al obtener las actividades" })
  }
}

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params
    const activity = await Activity.findById(id)

    if (!activity) {
      return res.status(404).json({ message: "Actividad no encontrada" })
    }

    res.status(200).json(activity)
  } catch (error) {
    console.error("Error en getActivityById:", error)
    res.status(500).json({ message: "Error al obtener la actividad" })
  }
}

export const updateActivity = async (req, res) => {
  const { id } = req.params
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!updatedActivity) {
      return res.status(404).json({ message: "Actividad no encontrada" })
    }

    res.status(200).json(updatedActivity)
  } catch (error) {
    console.error("Error al actualizar la actividad:", error)
    res.status(500).json({ message: "Error al actualizar la actividad" })
  }
}

export const deleteActivity = async (req, res) => {
  const { id } = req.params

  try {
    const deletedActivity = await Activity.findByIdAndDelete(id)

    if (!deletedActivity) {
      return res.status(404).json({ message: "Actividad no encontrada" })
    }

    res.status(200).json({ message: "Actividad eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar la actividad:", error.message)
    res.status(500).json({ message: "Error al eliminar la actividad" })
  }
}
