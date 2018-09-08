import axios from "axios";
import setAuthHeader from "./../helpers/setAuthTokens";
import token_decoder from "jwt-decode";

export function registerUser(userData, history) {
  return function(dispatch) {
    axios
      .post("/users/register", userData)
      .then(response => {
        history.push("/login");
      })
      .catch(err => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
      });
  };
}

export function loginUser(userData, history) {
  return function(dispatch) {
    axios
      .post("/users/login", userData)
      .then(response => {
        // history.push("/posts");
        const { token } = response.data;
        // set default axios header for all subsequent requests
        setAuthHeader(token);
        // set token in localstorage
        localStorage.setItem("jToken", token);
        // decode token and set current user
        const decodedUser = token_decoder(token);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: decodedUser
        });

        // navigate user to /
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
      });
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("jToken");
    setAuthHeader(false);

    dispatch({
      type: "SET_CURRENT_USER",
      payload: null
    });
  };
}
