import React, { useState, useEffect } from "react";
import axios from "axios";
import LightPricingB from "./LightPricingB";

function App() {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await axios.post("http://localhost:3001/api/getMissingData");
      //   const jsonData = await response.data.json(); // Assuming the response is JSON
      //   setResults(jsonData);
      //   // Handle the data as needed, e.g., update your state
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   setLoading(true);
      // }
      const response = await fetch("http://localhost:3001/api/getMissingData", {
        method: "POST",
      });
      const data = await response.json();
      setResults(data);
    };

    fetchData();
  }, []);
  console.log(results);
  return (
    <div>
      {/* {results.map((data) => {
        <p>data</p>;
      })} */}
    </div>
    // <div>{loading ? <p>Loading...</p> : <LightPricingB results={results} loading={loading} />}</div>
  );
}

export default App;
