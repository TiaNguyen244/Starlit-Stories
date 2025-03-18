import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();

const app= express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    res.send("API is running...")
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})