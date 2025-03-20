"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import book1 from "./images/book1.jpg"
import book2 from "./images/book2.jpg"
import book3 from "./images/book3.jpg"
import book4 from "./images/book4.jpg"
import book5 from "./images/book5.jpg"

const FeaturedBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const bookImgs = [book1, book2, book3, book4, book5]
  const booksPerPage = 3

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = require("./featured.json")
        setBooks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching featured books:", error)
        setError("Failed to load featured books. Please try again later.")
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + booksPerPage
      return newIndex >= books.length ? 0 : newIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - booksPerPage
      return newIndex < 0 ? Math.max(0, books.length - booksPerPage) : newIndex
    })
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  // Get current books to display
  const currentBooks = books.slice(currentIndex, currentIndex + booksPerPage)

  // If we don't have enough books to fill the page, add from the beginning
  if (currentBooks.length < booksPerPage && books.length > booksPerPage) {
    const remaining = booksPerPage - currentBooks.length
    const additionalBooks = books.slice(0, remaining)
    currentBooks.push(...additionalBooks)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Trending Books</h2>
            <div>
              <span className="text-muted me-2">
                {currentIndex + 1}-{Math.min(currentIndex + booksPerPage, books.length)} of {books.length}
              </span>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={prevSlide} disabled={currentIndex === 0}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={nextSlide}
                disabled={currentIndex + booksPerPage >= books.length && currentIndex !== 0}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          {books.length === 0 ? (
            <div className="alert alert-info">No books found. Try a different search or category.</div>
          ) : (
            <div className="row">
              {currentBooks.map((book, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="text-center pt-3">
                      <img
                        src={bookImgs[(currentIndex + index) % bookImgs.length] || "/placeholder.svg"}
                        className="card-img-top"
                        alt={book.title}
                        style={{
                          height: "200px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text text-muted">by {book.author}</p>
                      <p className="card-text">
                        <small className="text-muted">{book.genre}</small>
                      </p>
                      <p className="card-text small text-truncate">{book.description}</p>
                      <div className="mt-auto">
                        <p className="card-title fw-bold text-primary mb-2">{book.price}</p>
                        <Link to={`/books/${book._id || book.id}`} className="btn btn-primary w-100">
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedBooks

