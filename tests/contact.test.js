import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Contact from "../models/Contact.js"

let server
let createdContactId

beforeAll(async () => {
  server = app.listen(4004)
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await Contact.deleteMany({})
  await mongoose.connection.close()
  server.close()
})

describe("Contact API", () => {
  it("should create a new contact message", async () => {
    const newContact = {
      name: "Juan Pérez",
      email: "juan@example.com",
      message: "Estoy interesado en vuestros servicios."
    }

    const response = await request(app).post("/contacts").send(newContact)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.name).toBe("Juan Pérez")

    createdContactId = response.body._id
  })

  it("should get all contact messages", async () => {
    const response = await request(app).get("/contacts")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should delete a contact message", async () => {
    const response = await request(app).delete(`/contacts/${createdContactId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Mensaje eliminado correctamente")
  })
})
