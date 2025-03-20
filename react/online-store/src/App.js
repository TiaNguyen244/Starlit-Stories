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
import OrderConfirmationPage from "./pages/OrderConfirmationPage"

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
                <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              </Routes>
            </main>
            <footer className="bg-dark text-white py-4 mt-auto">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h5 className="fw-bold mb-3">Starlit Stories</h5>
                    <p>Your premier destination for books of all genres.</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="fw-bold mb-3">Quick Links</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a href="/" className="text-white text-decoration-none">
                          <i className="bi bi-house-door me-2"></i>Home
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="/books" className="text-white text-decoration-none">
                          <i className="bi bi-book me-2"></i>All Books
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="/cart" className="text-white text-decoration-none">
                          <i className="bi bi-cart3 me-2"></i>Cart
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h5 className="fw-bold mb-3">Contact Us</h5>
                    <address className="text-white">
                      <p className="mb-1">
                        <i className="bi bi-geo-alt me-2"></i>123 Book Street
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-building me-2"></i>Reading, CA 90210
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-envelope me-2"></i>info@starlitstories.com
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-telephone me-2"></i>(555) 123-4567
                      </p>
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

