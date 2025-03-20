"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Book from "../components/Book"
import GenreList from "../components/GenreList"

const BookListPage = () => {
  const { genre, subGenre, query } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = "http://localhost:3000/books"

        // If both genre and subgenre are specified, fetch books by subgenre
        if (genre && subGenre) {
          url = `http://localhost:3000/genre/${encodeURIComponent(genre)}/sub-genres/${encodeURIComponent(subGenre)}/books`
        }
        // If only genre is specified, fetch books by genre
        else if (genre) {
          url = `http://localhost:3000/genre/${encodeURIComponent(genre)}/books`
        }

        // If search query is specified, we would need a search endpoint
        // This is a simplified example - you might need to implement a proper search API
        if (query) {
          url = `http://localhost:3000/books?search=${encodeURIComponent(query)}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }

        const data = await response.json()
        setBooks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error)
        setError("Failed to load books. Please try again later.")
        setLoading(false)
      }
    }

    setLoading(true)
    fetchBooks()
  }, [genre, subGenre, query])

  const getPageTitle = () => {
    if (genre && subGenre) return `${subGenre} Books (${genre})`
    if (genre) return `Books in ${genre}`
    if (query) return `Search Results for "${query}"`
    return "All Books"
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <GenreList />
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">{getPageTitle()}</h2>

          {books.length === 0 ? (
            <div className="alert alert-info">No books found. Try a different search or category.</div>
          ) : (
            <div className="row">
              {books.map((book) => (
                <Book key={book._id || book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookListPage

