import express from 'express'
import {
  createContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js'

const router = express.Router()

// Crear un nuevo mensaje de contacto
router.post('/', createContact)

// Obtener todos los mensajes (sólo para admin en el frontend)
router.get('/', getAllContacts)

// Eliminar un mensaje específico
router.delete('/:id', deleteContact)

export default router
