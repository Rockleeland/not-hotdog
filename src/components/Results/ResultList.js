// Presentational component that displays a group of results

import React from "react";
import "./style.scss";

// Receives results from the Results container component
function ResultList({ results, isHotdog }) {
  let label = isHotdog ? "🌭" : "🚫";
  if (results.length === 0) {
    label = "";
  }
  return (
    <section>
    <p className="resultLabel">{label}</p>
    <ul>
      {results.map((imageURL) =>
        <li key={imageURL}>
          <img alt="result" height="80" src={imageURL} />
        </li>
      )}
    </ul>
    </section>
  );
}

export default ResultList;
