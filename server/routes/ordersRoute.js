import express from "express"
import { ObjectId } from "mongodb"

const router = express.Router()

// Create a new order


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

