import axios from "axios";
import setAuthHeader from "./../helpers/setAuthTokens";
import token_decoder from "jwt-decode";
import registerValidator from "./../helpers/register_validator";

export function registerUser(userData, history) {
  return function(dispatch) {
    let validator = registerValidator(userData);
    if (validator.isValid) {
      axios
        .post("http://159.89.171.16:9000/user_auth/signup", userData)
        .then(response => {
          if (response.data.status === "failure") {
            dispatch({ type: "GET_ERRORS", payload: response.data });
          } else {
            dispatch({ type: "GET_ERRORS", payload: {} });
            history.push("/login");
          }
        })
        .catch(err => {
          dispatch({ type: "GET_ERRORS", payload: err.response.data });
        });
    } else {
      dispatch({ type: "GET_ERRORS", payload: validator.errors });
    }
  };
}

export function loginUser(userData, history) {
  return function(dispatch) {
    axios
      .post("http://159.89.171.16:9000/user_auth/login", userData)
      .then(response => {
        dispatch({ type: "GET_ERRORS", payload: {} });
        history.push("/");
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
    dispatch({ type: "GET_ERRORS", payload: {} });
    dispatch({
      type: "SET_CURRENT_USER",
      payload: null
    });
  };
}

export function forgotPassword(payload) {
  return dispatch => {
    axios
      .post("http://159.89.171.16:9000/user_auth/forgot_password", payload)
      .then(resp => {
        dispatch({ type: "GET_ERRORS", payload: {} });
        dispatch({ type: "FORGOT_PASSWORD", payload: true });
      })
      .catch(err => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
      });
  };
}

export function verifyOTP(payload, history) {
  return dispatch => {
    axios
      .post("http://159.89.171.16:9000/user_auth/reset_password", payload)
      .then(resp => {
        dispatch({ type: "GET_ERRORS", payload: {} });
        dispatch({ type: "FORGOT_PASSWORD", payload: false });
        history.push("/login");
      })
      .catch(err => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
      });
  };
}
