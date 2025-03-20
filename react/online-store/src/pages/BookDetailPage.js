"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Recommendation from "../components/Recommendation"
import bookPic from "../components/images/book6.jpg";

const BookDetailPage = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch book details")
        }
        const data = await response.json()
        setBook(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching book details:", error)
        setError("Failed to load book details. Please try again later.")
        setLoading(false)
      }
    }

    setLoading(true)
    fetchBook()
  }, [id])

  const handleAddToCart = () => {
    if (book) {
      addToCart({ ...book, quantity })
      setQuantity(1) // Reset quantity after adding to cart
      console.log("quantity", quantity);
            // Show added to cart message
      setAddedToCart(true)
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }
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

  if (!book) {
    return <div className="alert alert-warning">Book not found</div>
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/books">Books</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {book.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-0">
            <img
              src={bookPic || "/placeholder.svg?height=400&width=300"}
              alt={book.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-md-8">
          <h1 className="mb-3">{book.title}</h1>
          <h5 className="text-muted mb-4">by {book.author}</h5>

          <div className="mb-4">
            <span className="badge bg-primary me-2">{book.genre}</span>
            {book.sub_genre && <span className="badge bg-secondary">{book.sub_genre}</span>}
          </div>

          <div className="mb-4">
            <h4 className="text-primary">{book.price}</h4>
          </div>

          <div className="mb-4">
            <p className="lead">{book.description || "No description available."}</p>
          </div>

          <div className="mb-4">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="quantity" className="col-form-label">
                  Quantity:
                </label>
              </div>
              <div className="col-auto">
                <select
                  id="quantity"
                  className="form-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            {addedToCart && (
                <div className="col-auto">
                  <div className="alert alert-success py-2 mb-0">
                    Added to cart! <Link to="/cart">View Cart</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h5>Book Details</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">ISBN</th>
                  <td>{book.ISBN || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Year</th>
                  <td>{book.year || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Rating</th>
                  <td>{book.rating || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>{book.description || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Language</th>
                  <td>{book.language || "English"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Recommendation isbn={book.ISBN} />
    </div>
  )
}

export default BookDetailPage

