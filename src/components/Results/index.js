// Container component that gathers results grouped by isHotdog or notHotdog status

import React from "react";
import ResultList from "./ResultList";
import { connect } from "react-redux";

// Passes group results to their respective lists
function Results({ hotdogs, notHotdogs }) {
  return (
    <>
      <ResultList results={hotdogs} isHotdog />
      <ResultList results={notHotdogs} />
    </>
  );
}

// Grabs results from redux
const mapStateToProps = (state) => {
  return {
    hotdogs: state.results.hotdogs,
    notHotdogs: state.results.notHotdogs
  };
};

export default connect(mapStateToProps)(Results);
