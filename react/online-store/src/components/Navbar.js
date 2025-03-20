"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Navbar.css" 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const { cartCount } = useCart()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:3000/genre")
        if (response.ok) {
          const data = await response.json()
          setGenres(data)
        }
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books/genre/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
        
          Starlit Stories
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                All Books
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Genre
              </a>
              <ul className="dropdown-menu multi-level">
                {loading ? (
                  <li>
                    <span className="dropdown-item">Loading...</span>
                  </li>
                ) : (
                  genres.map((genre) => (
                    <li
                      key={genre._id || genre.name}
                      className={genre.sub_genres?.length > 0 ? "dropdown-submenu" : ""}
                    >
                      <Link to={`/books/genre/${encodeURIComponent(genre.name)}`} className="dropdown-item">
                        {genre.name}
                      </Link>

                      {genre.sub_genres && genre.sub_genres.length > 0 && (
                        <ul className="dropdown-menu">
                          {genre.sub_genres.map((subGenre) => (
                            <li key={subGenre.name}>
                              <Link
                                to={`books/genre/${encodeURIComponent(genre.name)}/subGenre/${encodeURIComponent(subGenre.name)}`}
                                className="dropdown-item"
                              >
                                {subGenre.name}{" "}
                              </Link>
                            </li>
                            
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )
                )}
              </ul>
            </li>
          </ul>
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-0"
              type="search"
              placeholder="Search books..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
            <Link to="/cart" className="btn btn-outline-light position-relative">
                <i className="bi bi-cart3"></i>
                {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                </span>
                )}
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

