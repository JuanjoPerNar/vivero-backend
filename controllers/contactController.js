import Contact from "../models/Contact.js"

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    res.status(201).json(contact)
  } catch (error) {
    console.error("Error al crear el mensaje de contacto", error)
    res.status(400).json({ message: error.message })
  }
}

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json(contacts)
  } catch (error) {
    console.error("Error al obtener los mensajes de contacto", error)
    res.status(500).json({ message: "Error al obtener los mensajes" })
  }
}

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id)

    if (!contact) {
      return res.status(404).json({ message: "Mensaje no encontrado" })
    }

    res.status(200).json(contact)
  } catch (error) {
    console.error("Error al obtener el mensaje", error)
    res.status(500).json({ message: "Error al obtener el mensaje" })
  }
}

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Contact.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Mensaje no encontrado" })
    }

    res.status(200).json({ message: "Mensaje eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar el mensaje", error)
    res.status(500).json({ message: "Error al eliminar el mensaje" })
  }
}
