import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import fs from "fs"
import path from "path"

const serviceAccountPath = path.resolve("config/secrets/serviceAccountKey.json")
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"))

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  })
}

const db = getFirestore()
const usersRef = db.collection("users")

export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await usersRef.get()
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    res.status(200).json(users)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    res.status(500).json({ message: "Error al obtener usuarios" })
  }
}

export const getUserById = async (req, res) => {
  const { uid } = req.params
  try {
    const doc = await usersRef.doc(uid).get()
    if (!doc.exists) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.status(200).json({ id: doc.id, ...doc.data() })
  } catch (error) {
    console.error("Error al obtener el usuario:", error)
    res.status(500).json({ message: "Error al obtener el usuario" })
  }
}

export const updateUserRole = async (req, res) => {
  const { uid } = req.params
  const { role } = req.body

  try {
    await usersRef.doc(uid).update({ role })
    res.status(200).json({ message: "Rol actualizado correctamente" })
  } catch (error) {
    console.error("Error al actualizar el rol:", error)
    res.status(500).json({ message: "Error al actualizar el rol" })
  }
}

export const deleteUser = async (req, res) => {
  const { uid } = req.params

  try {
    await usersRef.doc(uid).delete()
    res.status(200).json({ message: "Usuario eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar el usuario:", error)
    res.status(500).json({ message: "Error al eliminar el usuario" })
  }
}
