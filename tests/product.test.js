import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Product from "../models/Products.js"

let server
let createdProductId

beforeAll(async () => {
  server = app.listen(4001)
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await Product.deleteMany({})
  await mongoose.connection.close()
  server.close()
})

describe("Product API", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "Test Product",
      description: "This is a test product",
      price: 15.99,
      category: "planta",
      size: "mediana",
      image: "https://example.com/test.jpg"
    }

    const response = await request(app).post("/products").send(newProduct)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.name).toBe("Test Product")

    createdProductId = response.body._id
  })

  it("should get all products", async () => {
    const response = await request(app).get("/products")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should get a product by ID", async () => {
    const response = await request(app).get(`/products/${createdProductId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(createdProductId)
  })

  it("should update a product", async () => {
    const response = await request(app)
      .put(`/products/${createdProductId}`)
      .send({ price: 19.99 })

    expect(response.statusCode).toBe(200)
    expect(response.body.price).toBe(19.99)
  })

  it("should delete a product", async () => {
    const response = await request(app).delete(`/products/${createdProductId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("Producto eliminado correctamente")
  })
})
