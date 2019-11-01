import React from "react";
import { connect } from 'react-redux';
import { IS_HOTDOG_MESSAGE, NOT_HOTDOG_MESSAGE } from "../../constants";
import "./style.scss";

function ResultList({ results, isHotdog }) {
  let label = isHotdog ? "🌭" : "🚫";
  if (results.length === 0) {
    label = "";
  }
  return (
    <section className={ isHotdog ? "hotdog" : "notHotdog" }>
    <p className="resultLabel">{label}</p>
    <ul>
      {results.map((imageURL) =>
        <li key={imageURL}>
          <img height="80" src={imageURL} />
        </li>
      )}
    </ul>

    </section>
  );
}

export default ResultList;
