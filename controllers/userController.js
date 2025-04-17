import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert } from 'firebase-admin/app'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, '../config/secrets/serviceAccountKey.json'))
)

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()
const usersCollection = db.collection('users')

export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await usersCollection.get()
    const users = []
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() })
    })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    res.status(500).json({ message: 'Error al obtener los usuarios' })
  }
}

export const getUserById = async (req, res) => {
  const { uid } = req.params
  try {
    const userDoc = await usersCollection.doc(uid).get()
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json({ id: userDoc.id, ...userDoc.data() })
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    res.status(500).json({ message: 'Error al obtener el usuario' })
  }
}

export const updateUserRole = async (req, res) => {
  const { uid } = req.params
  const { role } = req.body

  if (!role) {
    return res.status(400).json({ message: 'El campo "role" es obligatorio' })
  }

  try {
    const userRef = usersCollection.doc(uid)
    await userRef.update({ role })
    res.status(200).json({ message: 'Rol actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar el rol:', error)
    res.status(500).json({ message: 'Error al actualizar el rol del usuario' })
  }
}

export const deleteUser = async (req, res) => {
  const { uid } = req.params
  try {
    await usersCollection.doc(uid).delete()
    res.status(200).json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    res.status(500).json({ message: 'Error al eliminar el usuario' })
  }
}
