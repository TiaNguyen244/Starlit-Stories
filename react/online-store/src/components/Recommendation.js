import React, { useState, useEffect } from "react";
import Book from "./Book.js"

function Recommendation(props) {
  const [data, setData] = useState([]);
  let authorInd=0
  let titleInd =1
  let genreInd=2
  let subgenreInd =3
  let priceInd =4
  let ratingInd = 6
  let isbnInd = 7
  let decrInd = 8



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
    };

    fetchData();
  }, []);  

  return (
    <>
      <h3>Interested in more books? Check out these titles!</h3>
      {}
    </>
  );
}
export default Recommendation;
