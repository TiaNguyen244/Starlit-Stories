"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const GenreList = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:5000/genre")
        if (!response.ok) {
          throw new Error("Failed to fetch genres")
        }
        const data = await response.json()
        setGenres(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching genres:", error)
        setError("Failed to load genres. Please try again later.")
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  if (loading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card mb-4 border-0 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 fw-bold">Browse by Genre</h5>
      </div>
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {genres.map((genre) => (
            <li key={genre._id || genre.name} className="list-group-item border-0 py-3">
              <h6 className="fw-bold mb-2">{genre.name}</h6>
              {genre.sub_genres && genre.sub_genres.length > 0 && (
                <ul className="list-unstyled ms-3 mt-2">
                  {genre.sub_genres.map((subGenre) => (
                    <li key={subGenre.name} className="mb-2">
                      <Link
                        to={`/books/genre/${encodeURIComponent(genre.name)}/subGenre/${encodeURIComponent(subGenre.name)}`}
                        className="text-decoration-none text-muted d-flex align-items-center"
                      >
                        <i className="bi bi-chevron-right me-1 small"></i>
                        {subGenre.name} <span className="badge bg-light text-dark ms-2">{subGenre.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GenreList

