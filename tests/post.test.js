import request from "supertest"
import express from "express"
import postRoutes from "../routes/postRoutes.js"

jest.mock("../models/post.js", () => {
  const mockPosts = [
    {
      _id: "1",
      title: "Nueva planta",
      description: "He adoptado una nueva monstera deliciosa.",
      author: "María",
      image: "monstera.jpg"
    },
    {
      _id: "2",
      title: "Mi rincón verde",
      description: "Así ha quedado mi terraza con las nuevas plantas.",
      author: "Luis",
      image: "terraza.jpg"
    }
  ]

  const Post = function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue({
        _id: "3",
        ...data
      })
    }
  }

  Post.find = jest.fn().mockResolvedValue(mockPosts)
  Post.findById = jest.fn().mockImplementation(id =>
    Promise.resolve(mockPosts.find(p => p._id === id))
  )
  Post.findByIdAndUpdate = jest.fn().mockImplementation((id, data) =>
    Promise.resolve({ _id: id, ...data })
  )
  Post.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "1" })

  return {
    __esModule: true,
    default: Post
  }
})

const app = express()
app.use(express.json())
app.use("/posts", postRoutes)

describe("Post API", () => {
  it("GET /posts - should return all posts", async () => {
    const res = await request(app).get("/posts")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("GET /posts/:id - should return a single post", async () => {
    const res = await request(app).get("/posts/1")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("title", "Nueva planta")
  })

  it("POST /posts - should create a new post", async () => {
    const newPost = {
      title: "Macetas recicladas",
      description: "Compartiendo una idea para reutilizar envases.",
      author: "Elena",
      image: "macetas.jpg"
    }

    const res = await request(app).post("/posts").send(newPost)
    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe("Macetas recicladas")
  })

  it("PUT /posts/:id - should update a post", async () => {
    const updateData = {
      title: "Nueva planta actualizada",
      description: "He cambiado el texto del post."
    }

    const res = await request(app).put("/posts/1").send(updateData)
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe("Nueva planta actualizada")
  })

  it("DELETE /posts/:id - should delete a post", async () => {
    const res = await request(app).delete("/posts/1")
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Publicación eliminada correctamente")
  })
})
