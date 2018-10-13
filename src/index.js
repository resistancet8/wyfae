import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import token_decoder from "jwt-decode";
import { getUserProfile, getJournalData } from "./actions/user_actions";
import setAuthHeader from "./helpers/setAuthTokens";

const token = localStorage.getItem("jToken");
let decodedUser = {};
let flag = 1;

try {
  decodedUser = token_decoder(token);
} catch (e) {
  flag = 0;
  localStorage.removeItem("jToken")
}

if (token && flag) {
    setAuthHeader(token);

    store.dispatch({
      type: "SET_CURRENT_USER",
      payload: decodedUser
    });

    getUserProfile(store.dispatch, null, false, decodedUser);
    getJournalData(store.dispatch, null, false, decodedUser);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
