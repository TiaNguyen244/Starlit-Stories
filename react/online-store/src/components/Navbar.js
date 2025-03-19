"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books/search/${encodeURIComponent(searchQuery.trim())}`)
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
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/books/genre/Fiction">
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/books/genre/Non-Fiction">
                    Non-Fiction
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/books/genre/Mystery">
                    Mystery
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/books/genre/Science Fiction">
                    Science Fiction
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/books/genre/Fantasy">
                    Fantasy
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search books..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

