import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

//import './App.css';
import "./assets/scss/style.scss";

const history = createBrowserHistory();
console.disableYellowBox = true;

ReactDOM.render(
  <Router history={history}>
    <App />
    {/* <Route exact path="/" element={<App />} /> */}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
