import React from "react";
import { connect } from 'react-redux';
import { IS_HOTDOG_MESSAGE, NOT_HOTDOG_MESSAGE } from "./constants";

function ResultList({ allResults }) {
  return (
    <ul>
      {allResults.map((result) =>
        <li key={result.imageURL}>
          <img src={result.imageURL} />
          {result.isHotdog ? IS_HOTDOG_MESSAGE : NOT_HOTDOG_MESSAGE}
        </li>
      )}
    </ul>
  )
}

export default connect(
  (state) => {
    return {
      allResults: state.allResults
    };
  }
)(ResultList);
