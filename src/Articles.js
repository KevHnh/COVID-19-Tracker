import React, { useState, useEffect } from "react";
import './Articles.css'

function Articles() {
  const [data, setData] = useState([]);

  const apiGet = () => {
      fetch("https://newsdata.io/api/1/news?apikey=pub_48889ac4414b11d29ad9bc606ed043d4e5aa&q=corona&language=en")
      .then((response) => response.json())
      .then((json) => {
          console.log(json)
          setData(json)
      });
  };

  return (
    <div>
        My API <br />
        <button onClick={apiGet}>Fetch API</button>
        <br />
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Articles