import React, { useState, useEffect } from "react";

function GetRecommendation(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        const response = await fetch(
          `http://localhost:5000/rec/978-1-384-02055-6`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        console.log(json_response);
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error("Error fetching socks:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>TEST SEND MODEL COMPONENT</div>
    </>
  );
}
export default GetRecommendation;
