// server/routes/bookRoutes.js
import express from "express";
import { ObjectId } from "mongodb";

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