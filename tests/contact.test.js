import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Contact from "../models/Contact.js"

let server
let createdContacts = []

beforeAll(async () => {
  server = app.listen(4005)
  await Contact.deleteMany({})
  createdContacts = await Contact.insertMany([
    { name: "Laura", email: "laura@mail.com", message: "Hola soy Laura" },
    { name: "Carlos", email: "carlos@mail.com", message: "Hola soy Carlos" }
  ])
})

afterAll(async () => {
  await server.close()
  await mongoose.connection.close()
})

describe("Contact API", () => {
  it("POST /contacts - should create a new contact", async () => {
    const newContact = { name: "Ana", email: "ana@mail.com", message: "Hola soy Ana" }
    const res = await request(app).post("/contacts").send(newContact)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("name", "Ana")
  })

  it("GET /contacts - should return all contacts", async () => {
    const res = await request(app).get("/contacts")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThanOrEqual(2)
  })

  it("GET /contacts/:id - should return a single contact", async () => {
    const contact = createdContacts.find(c => c.name === "Laura")
    const res = await request(app).get(`/contacts/${contact._id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("name", "Laura")
  })

  it("DELETE /contacts/:id - should delete a contact", async () => {
    const contact = createdContacts.find(c => c.name === "Carlos")
    const res = await request(app).delete(`/contacts/${contact._id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("message", "Mensaje eliminado correctamente")
  })
})
