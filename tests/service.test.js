import request from "supertest"
import express from "express"
import serviceRoutes from "../routes/serviceRoutes.js"

const app = express()
app.use(express.json())
app.use("/services", serviceRoutes)

jest.mock("../models/Service.js", () => {
  const mockServices = [
    {
      _id: "1",
      title: "Alquiler de plantas",
      description: "Servicio de alquiler de plantas para eventos.",
      type: "Alquiler",
      image: "alquiler.jpg",
    },
  ]

  return {
    __esModule: true,
    default: class Service {
      constructor(data) {
        this._id = "2"
        Object.assign(this, data)
      }

      static find() {
        return Promise.resolve(mockServices)
      }

      static findById(id) {
        const found = mockServices.find((s) => s._id === id)
        return Promise.resolve(found || null)
      }

      static findByIdAndUpdate(id, data) {
        return Promise.resolve({ _id: id, ...data })
      }

      static findByIdAndDelete(id) {
        return Promise.resolve({ _id: id })
      }

      save() {
        return Promise.resolve(this)
      }
    },
  }
})

describe("Service API", () => {
  it("GET /services - should return all services", async () => {
    const res = await request(app).get("/services")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("GET /services/:id - should return a single service", async () => {
    const res = await request(app).get("/services/1")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("title", "Alquiler de plantas")
  })

  it("POST /services - should create a new service", async () => {
    const newService = {
      title: "Asesoramiento botánico",
      description: "Consultoría para el cuidado de plantas.",
      type: "Asesoramiento",
      image: "asesoramiento.jpg",
    }

    const res = await request(app).post("/services").send(newService)
    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe("Asesoramiento botánico")
  })

  it("PUT /services/:id - should update a service", async () => {
    const updatedService = {
      title: "Servicio actualizado",
      description: "Descripción nueva",
    }

    const res = await request(app).put("/services/1").send(updatedService)
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe("Servicio actualizado")
  })

  it("DELETE /services/:id - should delete a service", async () => {
    const res = await request(app).delete("/services/1")
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Servicio eliminado correctamente")
  })
})
