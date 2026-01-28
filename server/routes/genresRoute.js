// Get all genres with book count
import express from "express"

const router = express.Router()

// Get all genres with book count
router.get("/", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")

    // First, get all unique categories with their counts (books.json uses `category`)
    const mainGenres = await collection
      .aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 1, name: "$_id", count: 1 } },
        { $sort: { name: 1 } },
      ])
      .toArray()

    // Then, get all unique sub-genres with their counts and parent category
    const subGenres = await collection
      .aggregate([
        {
          $group: {
            _id: { category: "$category", sub_genre: "$sub_genre" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id.category",
            name: "$_id.sub_genre",
            count: 1,
          },
        },
        { $sort: { category: 1, name: 1 } },
      ])
      .toArray()

    // Organize sub-genres under their parent genres
    const genresWithSubGenres = mainGenres.map((genre) => {
      const relatedSubGenres = subGenres.filter((subGenre) => subGenre.category === genre.name)

      return {
        _id: genre._id,
        name: genre.name,
        count: genre.count,
        sub_genres: relatedSubGenres
          .filter((sg) => sg.name) // exclude null/undefined subgenre names
          .map((subGenre) => ({
            name: subGenre.name,
            count: subGenre.count,
          })),
      }
    })

    res.json(genresWithSubGenres)
  } catch (error) {
    console.error("Error fetching genres:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get books by genre
router.get("/:genre/books", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")
    const { genre } = req.params

    const books = await collection.find({ genre }).toArray()

    res.json(books)
  } catch (error) {
    console.error("Error fetching books by genre:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router

// Get books by sub-genre
router.get("/:genre/subGenre/:subGenre/books", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")
    const { genre, subGenre } = req.params

    const books = await collection
      .find({
        genre,
        sub_genre: subGenre,
      })
      .toArray()
      
    res.json(books)
  } catch (error) {
    console.error("Error fetching books by sub-genre:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})