import express from 'express'
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
} from '../controllers/userController.js'

const router = express.Router()
router.get('/', getAllUsers)
router.get('/:uid', getUserById)
router.put('/:uid', updateUserRole)
router.delete('/:uid', deleteUser)

export default router
