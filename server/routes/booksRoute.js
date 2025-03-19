// server/routes/bookRoutes.js
import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET /books
// Get all books with optional filters
router.get("/", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")

    // Build query based on request parameters
    const query = {}

    if (req.query.featured) {
      query.featured = req.query.featured === "true"
    }

    if (req.query.genre) {
      query.genre = req.query.genre
    }

    const books = await collection.find(query).toArray()
    res.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})


// Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")
    const { id } = req.params

    let book
    try {
      book = await collection.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by string ID
      book = await collection.findOne({ id: Number.parseInt(id) })
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})


export default router;