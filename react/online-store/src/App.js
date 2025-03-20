import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GetRecommendation from './components/GetRecommendation';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "./App.css";
import BookListPage from "./pages/BookListPage"
import HomePage from "./pages/HomePage"
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/recommendation" element={<GetRecommendation />} /> */}
              <Route path="/books" element={<BookListPage />} />
              <Route path="/books/genre/:genre" element={<BookListPage />} />
              <Route path="books/genre/:genre/subGenre/:subGenre" element={<BookListPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
