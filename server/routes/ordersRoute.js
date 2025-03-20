import express from "express"
import { ObjectId } from "mongodb"

const router = express.Router()

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("order")

    // Get order data from request body
    const orderData = req.body

    // Add timestamps
    orderData.createdAt = new Date()
    orderData.updatedAt = new Date()

    // Insert order into database
    const result = await collection.insertOne(orderData)

    // If order has a cart ID, clear the cart
    if (orderData.cartId) {
      await db.collection("cart").deleteOne({ _id: new ObjectId(orderData.cartId) })
    }

    // Return the created order with its ID
    res.status(201).json({ ...orderData, _id: result.insertedId })
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("order")
    const { id } = req.params

    const order = await collection.findOne({ _id: new ObjectId(id) })

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router

