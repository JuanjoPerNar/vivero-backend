import axios from 'axios'

const BASE_URL = 'https://trefle.io/api/v1/plants'
const TOKEN = process.env.TREFLE_TOKEN

if (!TOKEN) {
  throw new Error("Token de Trefle no definido.")
}

export const searchTreflePlants = async (query, page = 1) => {
  try {
    let response

    if (query) {
      response = await axios.get(BASE_URL, {
        params: {
          token: TOKEN,
          'filter[scientific_name]': query,
          page
        }
      })
    } else {
      // Si no hay búsqueda, mostramos listado general
      response = await axios.get(BASE_URL, {
        params: {
          token: TOKEN,
          page
        }
      })
    }

    const results = response.data.data

    if (!results || results.length === 0) {
      throw new Error('No se encontraron plantas.')
    }

    return results
  } catch (error) {
    if (error.response) {
      console.error('Error del servidor:', error.response.data)
      throw new Error('Error al buscar plantas en Trefle.')
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request)
      throw new Error('No se pudo conectar con Trefle.')
    } else {
      console.error('Error inesperado:', error.message)
      throw new Error(error.message || 'Error inesperado.')
    }
  }
}
