import express from 'express'
import { searchPlants } from '../controllers/trefleController.js'

const router = express.Router()

router.get('/', searchPlants)

export default router