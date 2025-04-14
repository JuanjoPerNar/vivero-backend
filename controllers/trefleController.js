import { searchTreflePlants } from '../utils/trefleService.js'

export const searchPlants = async (req, res) => {
  const { q, page } = req.query

  try {
    const plants = await searchTreflePlants(q, page)
    res.status(200).json(plants)
  } catch (error) {
    console.error('Error al consultar la API de Trefle:', error.message)
    return res.status(500).json({ error: error.message || 'Error inesperado.' })
  }
}
