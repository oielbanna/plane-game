import React from "react";
import ReactDOM from "react-dom";
import Scene from "./Scene";

import "./styles.css";

// https://codepen.io/Zultan/pen/mwGZBP
// https://codepen.io/carrot-e/pen/WGkJBZ
function App() {
  return (
    <div className="App">
      <Scene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
