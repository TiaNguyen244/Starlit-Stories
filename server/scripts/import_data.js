import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/starlit';

async function main() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();

    // Resolve paths reliably on Windows by converting import.meta.url to a file path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const booksPath = path.join(__dirname, '..', '..', 'mongodb', 'books.json');
    const ordersPath = path.join(__dirname, '..', '..', 'mongodb', 'order.json');

    // Fail fast if files are missing
    if (!fs.existsSync(booksPath)) throw new Error(`books.json not found at ${booksPath}`);
    if (!fs.existsSync(ordersPath)) throw new Error(`order.json not found at ${ordersPath}`);

    // read files
    const booksRaw = fs.readFileSync(booksPath, 'utf8');
    const ordersRaw = fs.readFileSync(ordersPath, 'utf8');

    const books = JSON.parse(booksRaw);
    const orders = JSON.parse(ordersRaw);

    // insert into collections (drop existing)
    const booksCol = db.collection('books');
    const ordersCol = db.collection('orders');

    await booksCol.deleteMany({});
    if (books.length) {
      await booksCol.insertMany(books);
      console.log(`Inserted ${books.length} books`);
    }

    await ordersCol.deleteMany({});
    if (orders.length) {
      await ordersCol.insertMany(orders);
      console.log(`Inserted ${orders.length} orders`);
    }

    console.log('Import complete');
  } catch (err) {
    console.error('Import failed:', err);
  } finally {
    await client.close();
  }
}

main();
