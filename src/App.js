import React, { useState } from 'react';
import { connect } from 'react-redux';
import Clarifai from 'clarifai';
import './App.scss';
import ResultList from "./ResultList";
import { addNewResult } from "./redux/actions";
import { IS_HOTDOG_MESSAGE, NOT_HOTDOG_MESSAGE } from "./constants";

const app = new Clarifai.App({
 apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

function App({ addNewResult }) {
  const [searchText, setSearchText] = useState("");
  const [resultText, setResultText] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/hotdog.png" className="App-logo" alt="logo" />
        <p>
          Not Hotdog App
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          app.models.predict(Clarifai.GENERAL_MODEL, searchText)
            .then(response => {
              const isHotdog = response.outputs[0].data.concepts.find((concept) => concept.name === "hotdog");
              setResultText(isHotdog ? IS_HOTDOG_MESSAGE: NOT_HOTDOG_MESSAGE);
              addNewResult({
                imageURL: searchText,
                isHotdog
              });
              setSearchText("");
              console.log(response);
            })
            .catch(err => {
              console.log(err);
            });
          }}>
          <label htmlFor="imageURL">Image URL <input type="text" name="imageURL" value={searchText} onChange={(event) => setSearchText(event.target.value)} /></label>
          <input type="submit" value="Identify" />
      </form>
      <p>{resultText}</p>
      </header>

      <ResultList />

    </div>
  );
}

export default connect(
  null,
  { addNewResult }
)(App);
