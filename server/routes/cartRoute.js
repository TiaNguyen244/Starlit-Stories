// server/routes/bookRoutes.js
import express from "express";

const router = express.Router();
// GET /api/cart - Retrieve all items in the cart
router.get("/", async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db("bookstore");
    const cartItems = await db.collection("cart").find({}).toArray();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart by userId or sessionId




// Get cart by userId or sessionId




// Get cart by userId or sessionId





// Get all unprocessed carts for recommendation training


        // Find carts that haven't been processed for recommendations