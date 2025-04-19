import request from "supertest"
import app from "../index.js"
import { getFirestore } from "firebase-admin/firestore"

const db = getFirestore()
const usersRef = db.collection("users")

let createdUserId
let server

beforeAll((done) => {
  server = app.listen(done)
})

describe("User API (Firestore)", () => {
  it("should create a new user in Firestore", async () => {
    const newUser = {
      name: "Test",
      surname: "User",
      email: "testuser@example.com",
      role: "user"
    }

    const docRef = await usersRef.add(newUser)
    createdUserId = docRef.id

    const snapshot = await docRef.get()
    const data = snapshot.data()

    expect(data.name).toBe("Test")
    expect(data.email).toBe("testuser@example.com")
  })

  it("should get all users", async () => {
    const response = await request(app).get("/users")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should get a user by ID", async () => {
    expect(createdUserId).toBeDefined()
    const response = await request(app).get(`/users/${createdUserId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("id", createdUserId)
  })

  it("should update user role", async () => {
    const response = await request(app)
      .put(`/users/${createdUserId}`)
      .send({ role: "admin" })

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Rol actualizado correctamente")
  })

  it("should delete the user", async () => {
    const response = await request(app).delete(`/users/${createdUserId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Usuario eliminado correctamente")
  })
})

afterAll(() => {
  if (server) server.close()
})
