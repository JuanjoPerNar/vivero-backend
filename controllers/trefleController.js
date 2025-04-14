import { searchTreflePlants } from '../utils/trefleService.js'

export const searchPlants = async (req, res) => {
  const { q } = req.query

  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'El parámetro "q" es obligatorio.' })
  }

  try {
    const plants = await searchTreflePlants(q)

    if (plants.length === 0) {
      return res.status(404).json({ error: 'No se encontraron plantas con ese nombre.' })
    }

    res.status(200).json(plants)
  } catch (error) {
    console.error('Error al consultar la API de Trefle:', error.message)
    console.error('Detalles del error:', error)

    if (error.response) {
      return res.status(502).json({ error: 'Error en la respuesta de Trefle API.' })
    } else if (error.request) {
      return res.status(504).json({ error: 'No se pudo conectar con Trefle API.' })
    } else {
      return res.status(500).json({ error: 'Error inesperado al procesar la solicitud.' })
    }
  }
}
