import React from "react";
import ResultList from "./ResultList";
import { connect } from "react-redux";

function Results({ hotdogs, notHotdogs }) {
  return (
    <>
      <ResultList results={hotdogs} isHotdog />
      <ResultList results={notHotdogs} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    hotdogs: state.results.hotdogs,
    notHotdogs: state.results.notHotdogs
  };
};

export default connect(mapStateToProps)(Results);
