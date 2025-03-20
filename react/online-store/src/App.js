import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Recommendation from './components/Recommendation';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "./App.css";
import BookListPage from "./pages/BookListPage"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext"
function App() {
  return (
    <>
      <Router>
        <CartProvider>
        <div className="App">
          <Navbar />
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/recommendation" element={<GetRecommendation />} /> */}
              <Route path="/books" element={<BookListPage />} />
              <Route path="/books/genre/:genre" element={<BookListPage />} />
              <Route path="books/genre/:genre/subGenre/:subGenre" element={<BookListPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
