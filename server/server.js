import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
// Import API routes
import booksRoute from "./routes/booksRoute.js"
import genresRoute from "./routes/genresRoute.js"
import ordersRoute from "./routes/ordersRoute.js"
dotenv.config();

const app= express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// Database connection
let db

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    console.log("Connected to MongoDB")
    db = client.db()

    // Make db available to routes
    app.locals.db = db

    return db
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}


app.get("/", (req, res)=> {
    res.send("API is running...")
})


// Mount routes under /api
app.use("/books", booksRoute);
app.use("/genre", genresRoute);
app.use("/order", ordersRoute);

// Start server
async function startServer() {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer().catch(console.error)

export default app