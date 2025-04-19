import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Post from "../models/Post.js"

let server
let createdPostId

beforeAll(async () => {
  server = app.listen(4002)
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await Post.deleteMany({})
  await mongoose.connection.close()
  server.close()
})

describe("Post API", () => {
  it("should create a new post", async () => {
    const newPost = {
      title: "Test Post",
      author: "Test Author",
      description: "This is a test post",
      image: "https://example.com/test-post.jpg"
    }

    const response = await request(app).post("/posts").send(newPost)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.title).toBe("Test Post")

    createdPostId = response.body._id
  })

  it("should get all posts", async () => {
    const response = await request(app).get("/posts")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should get a post by ID", async () => {
    const response = await request(app).get(`/posts/${createdPostId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(createdPostId)
  })

  it("should update a post", async () => {
    const response = await request(app)
      .put(`/posts/${createdPostId}`)
      .send({ title: "Updated Test Post" })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe("Updated Test Post")
  })

  it("should delete a post", async () => {
    const response = await request(app).delete(`/posts/${createdPostId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Publicación eliminada correctamente")
  })
})
