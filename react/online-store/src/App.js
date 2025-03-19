import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GetRecommendation from './components/GetRecommendation';
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "./App.css";

function App() {

  const [data, setData] = useState([]);
  let book_display = []
  const API_URI = "http://localhost:3000/books";
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        const response = await fetch(API_URI);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response); // assign JSON response to the data variable.
        console.log(json_response)
        book_display = json_response
        console.log(book_display)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container py-4">
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/recommendation" element={<GetRecommendation />} />
              
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
