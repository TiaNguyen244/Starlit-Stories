import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "./App.css"
import BookListPage from "./pages/BookListPage"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
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
                <Route path="/books" element={<BookListPage />} />
                <Route path="/books/genre/:genre" element={<BookListPage />} />
                <Route path="/books/genre/:genre/subGenre/:subGenre" element={<BookListPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />


              </Routes>
            </main>
            <footer className="bg-dark text-white py-4 mt-auto">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h5>Starlit Stories</h5>
                    <p>Your premier destination for books of all genres.</p>
                  </div>
                  <div className="col-md-4">
                    <h5>Quick Links</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a href="/" className="text-white">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/books" className="text-white">
                          All Books
                        </a>
                      </li>
                      <li>
                        <a href="/cart" className="text-white">
                          Cart
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h5>Contact Us</h5>
                    <address className="text-white">
                      <p>123 Book Street</p>
                      <p>Reading, CA 90210</p>
                      <p>Email: info@starlitstories.com</p>
                      <p>Phone: (555) 123-4567</p>
                    </address>
                  </div>
                </div>
                <hr className="bg-light" />
                <div className="text-center">
                  <p>&copy; {new Date().getFullYear()} Starlit Stories. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </Router>
    </>
  )
}

export default App

