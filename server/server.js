import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected");
    // Make the Mongo client available to routes
    app.locals.client = client;
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}
connectDB();

app.get("/", (req, res)=> {
    res.send("API is running...")
})

// Import API routes
import bookRoutes from "./routes/booksRoute.js"
// Mount routes under /api
app.use("/api/books", bookRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/checkout", orderRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})