import request from "supertest"
import express from "express"
import activityRoutes from "../routes/activityRoutes.js"

const app = express()
app.use(express.json())
app.use("/activities", activityRoutes)

jest.mock("../models/Activity.js", () => {
  const mockActivities = [
    {
      _id: "1",
      title: "Taller de bonsáis",
      description: "Aprende a cuidar bonsáis",
      date: "2025-05-10",
      type: "Taller",
      image: "bonsai.jpg",
      location: "Aula 1",
    },
  ]

  return {
    __esModule: true,
    default: class Activity {
      constructor(data) {
        this._id = "2"
        Object.assign(this, data)
      }

      static find() {
        return Promise.resolve(mockActivities)
      }

      static findById(id) {
        const act = mockActivities.find((a) => a._id === id)
        return Promise.resolve(act || null)
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
    }
  }
})

describe("Activity API", () => {
  it("GET /activities - should return all activities", async () => {
    const res = await request(app).get("/activities")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("GET /activities/:id - should return a single activity", async () => {
    const res = await request(app).get("/activities/1")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("title", "Taller de bonsáis")
  })

  it("POST /activities - should create a new activity", async () => {
    const newActivity = {
      title: "Exposición de orquídeas",
      description: "Una muestra de orquídeas de todo el mundo",
      date: "2025-06-01",
      type: "Exposición",
      image: "orquideas.jpg",
      location: "Sala central",
    }

    const res = await request(app).post("/activities").send(newActivity)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("title", "Exposición de orquídeas")
  })

  it("PUT /activities/:id - should update an activity", async () => {
    const updatedActivity = {
      title: "Taller actualizado",
      description: "Nueva descripción",
    }

    const res = await request(app).put("/activities/1").send(updatedActivity)
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe("Taller actualizado")
  })

  it("DELETE /activities/:id - should delete an activity", async () => {
    const res = await request(app).delete("/activities/1")
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Actividad eliminada correctamente")
  })
})
