// server/routes/bookRoutes.js
import express from "express";

const router = express.Router();
// GET /api/cart - Retrieve all items in the cart
router.get("/", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("cart")

    // Build query based on request parameters
    const query = {}
    const books = await collection.find(query).toArray()
    res.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get cart by userId or sessionId
router.get("/:id", async (req, res) => {
  try {
    const { db } = req.app.locals
    const { id } = req.params

    // Check if id is userId or sessionId
    const cart = await db.collection("cart").findOne({
      $or: [{ userId: id }, { sessionId: id }],
    })

    if (!cart) {
      return res.json({ items: [] })
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add item to cart
router.post("/:id/items", async (req, res) => {
  try {
    const { db } = req.app.locals
    const { id } = req.params
    const { bookId, quantity = 1 } = req.body

    // Check if cart exists
    let cart = await db.collection("cart").findOne({
      $or: [{ userId: id }, { sessionId: id }],
    })

    // If cart doesn't exist, create one
    if (!cart) {
      cart = {
        sessionId: id,
        items: [],
        createdAt: new Date(),
      }

      await db.collection("cart").insertOne(cart)
    }

    // Check if book exists in cart
    const existingItemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId.toString())

    if (existingItemIndex >= 0) {
      // Update quantity if book exists
      await db
        .collection("cart")
        .updateOne({ _id: cart._id, "items.bookId": bookId }, { $inc: { "items.$.quantity": quantity } })
    } else {
      // Add new item if book doesn't exist
      await db.collection("cart").updateOne(
        { _id: cart._id },
        {
          $push: {
            items: {
              bookId,
              quantity,
              addedAt: new Date(),
            },
          },
          $set: { updatedAt: new Date() },
        },
      )
    }

    // Get updated cart
    const updatedCart = await db.collection("cart").findOne({ _id: cart._id })

    res.json(updatedCart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})




// Get cart by userId or sessionId




// Get cart by userId or sessionId





// Get all unprocessed carts for recommendation training


        // Find carts that haven't been processed for recommendations

export default router