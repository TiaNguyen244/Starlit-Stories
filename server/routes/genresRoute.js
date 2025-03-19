// Get all genres with book count
import express from "express"

const router = express.Router()

// Get all genres with book count
router.get("/", async (req, res) => {
  try {
    const { db } = req.app.locals
    const collection = db.collection("books")

    const genres = await collection
      .aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } },
        { $project: { _id: 1, name: "$_id", count: 1 } },
        { $sort: { name: 1 } },
      ])
      .toArray()

    res.json(genres)
  } catch (error) {
    console.error("Error fetching genres:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router

