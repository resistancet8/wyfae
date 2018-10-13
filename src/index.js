import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import token_decoder from "jwt-decode";
import { profile, journal } from "./dummyData";
import { getUserProfile } from "./actions/auth_actions";
import setAuthHeader from './helpers/setAuthTokens';

// check for login status and dispatch action.
const token = localStorage.getItem("jToken");

if (token) {
  setAuthHeader(token);
  const decodedUser = token_decoder(token);
  
  store.dispatch({
    type: "SET_CURRENT_USER",
    payload: decodedUser
  });

  getUserProfile(store.dispatch, null, false, decodedUser);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
