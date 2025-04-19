import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Activity from "../models/Activity.js"

let server
let createdActivityId

beforeAll(async () => {
  server = app.listen(4005)
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await Activity.deleteMany({})
  await mongoose.connection.close()
  server.close()
})

describe("Activity API", () => {
  it("should create a new activity", async () => {
    const newActivity = {
      title: "Taller de bonsáis",
      description: "Aprende a cuidar bonsáis con expertos.",
      type: "taller",
      date: "2025-05-10",
      image: "https://example.com/bonsai.jpg"
    }

    const response = await request(app).post("/activities").send(newActivity)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.title).toBe("Taller de bonsáis")

    createdActivityId = response.body._id
  })

  it("should get all activities", async () => {
    const response = await request(app).get("/activities")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should get an activity by ID", async () => {
    const response = await request(app).get(`/activities/${createdActivityId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(createdActivityId)
  })

  it("should update an activity", async () => {
    const response = await request(app)
      .put(`/activities/${createdActivityId}`)
      .send({ title: "Taller de bonsáis actualizado" })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe("Taller de bonsáis actualizado")
  })

  it("should delete an activity", async () => {
    const response = await request(app).delete(`/activities/${createdActivityId}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Actividad eliminada correctamente")
  })
})
