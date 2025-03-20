"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "./Book"
import book1 from "./images/book1.jpg";
import book2 from "./images/book2.jpg";
import book3 from "./images/book3.jpg";
import book4 from "./images/book4.jpg";
import book5 from "./images/book5.jpg";



const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let bookImgs = [book1, book2, book3, book4, book5];
  let bookIndex = -1;

  useEffect(() => {
    const fetchBooks = async () => {
         try {
           const data = require("./featured.json");
           setBooks(data);
           setLoading(false);
         } catch (error) {
           console.error("Error fetching featured books:", error);
           setError("Failed to load featured books. Please try again later.");
           setLoading(false);
         }

    };

    fetchBooks();
  }, []);

  function getBookIndex(){
    bookIndex++;
    return bookIndex;
  }




  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h2 className="mb-4">Trending Books:</h2>

          {books.length === 0 ? (
            <div className="alert alert-info">
              No books found. Try a different search or category.
            </div>
          ) : (
            <div className="column">
              {books.map((book) => (
                <div className="row-md-4 row-lg-3 mb-4">
                  <div className="card h-100">
                    <div className="text-center pt-3">
                      <img
                        src={bookImgs[getBookIndex()] || "/placeholder.svg"}
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
                      <p className="card-text">{book.description}</p>
                      <p className="card-title">Price: {book.price}</p>
                      {/* <p className="card-text fw-bold">${book.price?.toFixed(2) || "N/A"}</p> */}
                      <Link
                        to={`/books/${book._id || book.id}`}
                        className="btn btn-primary mt-auto"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
