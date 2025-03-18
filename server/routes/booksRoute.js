// server/routes/bookRoutes.js
import express from "express";
import { ObjectId } from "mongodb";
import axios from "axios";

const router = express.Router();

// GET /api/books
// Optional query parameters: search (text in name) and category
router.get("/", async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db("bookstore");
    const { search, category } = req.query;
    let query = {};

    if (search) {
      // Simple text search on book name (case-insensitive)
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const books = await db.collection("books").find(query).toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/:id - Retrieve book details by _id
router.get("/:id", async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db("bookstore");
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;