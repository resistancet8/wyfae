import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import token_decoder from "jwt-decode";

// check for login status and dispatch action.
const token = localStorage.getItem("jToken");
if (token) {
  const decodedUser = token_decoder(token);
  store.dispatch({
    type: "SET_CURRENT_USER",
    payload: decodedUser
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
