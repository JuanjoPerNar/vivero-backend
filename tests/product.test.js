import request from "supertest"
import express from "express"
import productRoutes from "../routes/productRoutes.js"

jest.mock("../models/products.js", () => {
  const mockData = [
    {
      _id: "1",
      name: "Ficus",
      description: "Planta de interior",
      price: 10,
      category: "Interior",
      size: "M",
      image: "ficus.jpg"
    },
    {
      _id: "2",
      name: "Monstera",
      description: "Planta tropical",
      price: 15,
      category: "Interior",
      size: "L",
      image: "monstera.jpg"
    }
  ]

  const Product = function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue({
        _id: "3",
        ...data
      })
    }
  }

  Product.find = jest.fn().mockResolvedValue(mockData)
  Product.findById = jest.fn().mockImplementation(id =>
    Promise.resolve(mockData.find(p => p._id === id))
  )
  Product.findByIdAndUpdate = jest.fn().mockImplementation((id, data) =>
    Promise.resolve({ _id: id, ...data })
  )
  Product.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "1" })

  return {
    __esModule: true,
    default: Product
  }
})

const app = express()
app.use(express.json())
app.use("/products", productRoutes)

describe("Product API", () => {
  it("GET /products - should return all products", async () => {
    const res = await request(app).get("/products")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("GET /products/:id - should return a single product", async () => {
    const res = await request(app).get("/products/1")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("name", "Ficus")
  })

  it("POST /products - should create a new product", async () => {
    const newProduct = {
      name: "Sansevieria",
      description: "Resistente y elegante",
      price: 12,
      category: "Interior",
      size: "S",
      image: "sansevieria.jpg"
    }

    const res = await request(app).post("/products").send(newProduct)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe("Sansevieria")
  })

  it("PUT /products/:id - should update a product", async () => {
    const updatedData = {
      name: "Ficus Lyrata",
      price: 18
    }

    const res = await request(app).put("/products/1").send(updatedData)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe("Ficus Lyrata")
  })

  it("DELETE /products/:id - should delete a product", async () => {
    const res = await request(app).delete("/products/1")
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Producto eliminado correctamente")
  })
})
