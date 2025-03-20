import React, { useState, useEffect } from "react";
import Book from "./Book.js"

import { Link } from "react-router-dom";

function Recommendation(props) {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);




  let authorInd=0
  let titleInd =1
  let genreInd=2
  let subgenreInd =3
  let priceInd =4
  let yearInd =5
  let ratingInd = 6
  let isbnInd = 7
  let descrInd = 8



  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        const response = await fetch(
          `http://localhost:5000/rec/${props.isbn}`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        console.log(json_response);
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error("Error fetching recs:", error);
      }

      try {
        const response = await fetch(`http://localhost:3000/books/`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }

    };

    fetchData();
  }, []);  


  const getIDfromISBN =  (isbn) =>{
    let book = books.filter((object) => object.ISBN == isbn);
    console.log(book)
    return book[0]?._id;

  }


  return (
    <>
      <h3>Interested in more books? Check out these titles!</h3>
      <div className="row">
        {data.map((book) => (
          <div className="col">
            <div className="card h-100">
              <div className="text-center pt-3">
                <img
                  src="/placeholder.svg"
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
                <h5 className="card-title">{book[titleInd]}</h5>
                <p className="card-text text-muted">by {book[authorInd]}</p>
                <p className="card-text">
                  <small className="text-muted">{book[genreInd]}</small>
                  <small className="text-muted">: {book[subgenreInd]}</small>
                </p>
                {/* <p className="card-text">{book[descrInd]}</p> */}
                <p className="card-title">Price: ${book[priceInd]}</p>
                <Link
                  to={`/books/${getIDfromISBN(book[isbnInd])}`}
                  className="btn btn-primary mt-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Recommendation;
