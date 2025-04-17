import Service from "../models/Service.js"

export const createService = async (req, res) => {
  try {
    const service = new Service(req.body)
    await service.save()
    res.status(201).json(service)
  } catch (error) {
    console.error("Error al crear el servicio:", error)
    res.status(400).json({ message: error.message })
  }
}

export const getAllServices = async (req, res) => {
  try {
    const { type } = req.query
    const filter = type ? { type } : {}

    const services = await Service.find(filter)
    res.status(200).json(services)
  } catch (error) {
    console.error("Error al obtener los servicios:", error)
    res.status(500).json({ message: "Error al obtener los servicios" })
  }
}

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params
    const service = await Service.findById(id)

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" })
    }

    res.status(200).json(service)
  } catch (error) {
    console.error("Error al obtener el servicio:", error)
    res.status(500).json({ message: "Error al obtener el servicio" })
  }
}

export const updateService = async (req, res) => {
  const { id } = req.params
  try {
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedService) {
      return res.status(404).json({ message: "Servicio no encontrado" })
    }

    res.status(200).json(updatedService)
  } catch (error) {
    console.error("Error al actualizar el servicio:", error)
    res.status(500).json({ message: "Error al actualizar el servicio" })
  }
}

export const deleteService = async (req, res) => {
  const { id } = req.params

  try {
    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      return res.status(404).json({ message: "Servicio no encontrado" })
    }

    res.status(200).json({ message: "Servicio eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar el servicio:", error)
    res.status(500).json({ message: "Error al eliminar el servicio" })
  }
}
