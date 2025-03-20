import { Link } from "react-router-dom"
import bookPic from "./images/book.jpg";

const Book = ({ book }) => {
  // Default image 
  const coverImage = book.coverImage || "https://via.placeholder.com/150x225?text=No+Cover"

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="text-center pt-3">
          <img
            src={bookPic || "/placeholder.svg"}
            className="card-img-top"
            alt={book.title}
            style={{ height: "200px", width: "auto", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text text-muted">by {book.author}</p>
          <p className="card-text">
            <small className="text-muted">{book.genre}</small>
          </p>
          <div className="mt-auto">
            <p className="card-text fw-bold text-primary mb-2">{book.price}</p>
            <Link to={`/books/${book._id || book.id}`} className="btn btn-primary w-100">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book

