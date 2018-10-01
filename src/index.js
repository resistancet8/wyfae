import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import token_decoder from "jwt-decode";
import { dummyData } from "./actions/user_actions";

// check for login status and dispatch action.
const token = localStorage.getItem("jToken");
if (token) {
  const decodedUser = token_decoder(token);
  store.dispatch({
    type: "SET_CURRENT_USER",
    payload: decodedUser
  });

  store.dispatch({
    type: "FETCH_USER_DETAILS",
    payload: Object.assign({}, dummyData, { journal: {} })
  });

  store.dispatch({ type: "INSERT_QUOTES", payload: dummyData.journal.quotes });
  store.dispatch({ type: "INSERT_GOALS", payload: dummyData.journal.goals });
  store.dispatch({ type: "INSERT_TODOS", payload: dummyData.journal.todos });
  store.dispatch({ type: "INSERT_NOTES", payload: dummyData.journal.notes });
  store.dispatch({ type: "INSERT_MEMORY", payload: dummyData.memory });
  store.dispatch({ type: "INSERT_ARTS", payload: dummyData.arts });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
