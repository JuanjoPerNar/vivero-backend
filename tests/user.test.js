import request from "supertest"
import app from "../index.js"
import { getFirestore } from "firebase-admin/firestore"

const db = getFirestore()
const usersRef = db.collection("users")

describe("User API", () => {
  const testUID = "test-uid-juan"
  const testUser = {
    name: "Juan",
    email: "juan@test.com",
    role: "user"
  }

  beforeAll(async () => {
    await usersRef.doc(testUID).set(testUser)
  })

  afterAll(async () => {
    await usersRef.doc(testUID).delete()
  })

  it("GET /users - should return all users", async () => {
    const res = await request(app).get("/users")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("GET /users/:uid - should return a single user", async () => {
    const res = await request(app).get(`/users/${testUID}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("name", "Juan")
  })

  it("PUT /users/:uid - should update the user's role", async () => {
    const res = await request(app)
      .put(`/users/${testUID}`)
      .send({ role: "admin" })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("message", "Rol actualizado correctamente")
  })

  it("DELETE /users/:uid - should delete the user", async () => {
    const res = await request(app).delete(`/users/${testUID}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("message", "Usuario eliminado correctamente")

    const check = await usersRef.doc(testUID).get()
    expect(check.exists).toBe(false)
  })
})
