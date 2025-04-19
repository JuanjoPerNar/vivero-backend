import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Service from "../models/Service.js"

let server
let createdServiceId

beforeAll(async () => {
  server = app.listen(4003)
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await Service.deleteMany({})
  await mongoose.connection.close()
  server.close()
})

describe("Service API", () => {
  it("should create a new service", async () => {
    const newService = {
      title: "Test Service",
      description: "This is a test service",
      type: "asesoramiento",
      image: "https://example.com/test-service.jpg"
    }

    const response = await request(app).post("/services").send(newService)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.title).toBe("Test Service")

    createdServiceId = response.body._id
  })

  it("should get all services", async () => {
    const response = await request(app).get("/services")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should get a service by ID", async () => {
    const response = await request(app).get(`/services/${createdServiceId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(createdServiceId)
  })

  it("should update a service", async () => {
    const response = await request(app)
      .put(`/services/${createdServiceId}`)
      .send({ title: "Updated Service" })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe("Updated Service")
  })

  it("should delete a service", async () => {
    const response = await request(app).delete(`/services/${createdServiceId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Servicio eliminado correctamente")
  })
})
