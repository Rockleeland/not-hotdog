// Handles logic for landing page

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Clarifai from 'clarifai';
import axios from "axios";
import './App.scss';
import Results from "./components/Results";
import { addNewResult } from "./redux/actions";
import { IS_HOTDOG_MESSAGE, NOT_HOTDOG_MESSAGE } from "./constants";

// Instantiates Clarifai package and authenticates it
const app = new Clarifai.App({
 apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

// Landing page component
function App({ addNewResult }) {
  const [searchText, setSearchText] = useState("");
  const [resultText, setResultText] = useState("");

  const classifyImage = (imageURL) => {
    app.models.predict(Clarifai.GENERAL_MODEL, imageURL)
      .then(response => {
        console.log(response);
        const isHotdog = response.outputs[0].data.concepts.find((concept) => concept.name === "hotdog");
        setResultText(isHotdog ? IS_HOTDOG_MESSAGE : NOT_HOTDOG_MESSAGE);
        addNewResult({
          imageURL,
          isHotdog
        });
        setSearchText("");
      })
      .catch(console.error);
  };

  return (
    <div className="App">
      <nav>
        <img src="/images/not-hotdog-logo-tangerine.png" className="App-logo" alt="logo" />
      </nav>

      <h1>NOT HOTDOG</h1>
      <p className="header">Hotdog or Not Hotdog, paste an image URL here to find out:</p>

      <div className="form">
        <input type="text" name="imageURL" value={searchText} onChange={(event) => setSearchText(event.target.value.trim())} />
        <label htmlFor="imageURL">Image URL</label>

        <div>
          // Send image URL from search box to Clarify.
          <button onClick={() => classifyImage(searchText)}>
            Identify URL
          </button>

          // Send image URL from Unsplash to Clarifai.
          <button onClick={() => {
            axios.get(`https://api.unsplash.com/photos/random?query=${Math.random() < 0.7 ? 'hotdog' : 'food'}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
              .then((result) => {
                classifyImage(result.data.urls.small);
              })
            }}
          >
            Get Random Image
          </button>
        </div>

      </div>

      <p className="resultText">{resultText}</p>

      <Results />

    </div>
  );
}

export default connect(
  null,
  { addNewResult }
)(App);
