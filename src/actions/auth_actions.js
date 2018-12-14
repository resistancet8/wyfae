import axios from "axios";
import setAuthHeader from "./../helpers/setAuthTokens";
import token_decoder from "jwt-decode";
import registerValidator from "./../helpers/register_validator";
import { getUserProfile, getJournalData } from "./user_actions";

export function registerUser(userData, history) {
  return function(dispatch) {
    let validator = registerValidator(userData);
    if (validator.isValid) {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/user_auth/signup`, userData)
        .then(response => {
          if (response.data.status === "failure") {
            dispatch({ type: "GET_ERRORS", payload: response.data });
          } else {
            dispatch({ type: "GET_ERRORS", payload: {} });
            dispatch({ type: "SHOW_TOAST", payload: "Registration Success" });
            history.push("/login");
          }
        })
        .catch(err => {
          if (err.response && err.response.data) {
            dispatch({ type: "GET_ERRORS", payload: err.response.data });
            dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
          } else {
            dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
          }
        });
    } else {
      dispatch({ type: "GET_ERRORS", payload: validator.errors });
    }
  };
}

export function loginUser(userData, history) {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user_auth/login`, userData)
      .then(response => {
        const { token } = response.data;
        dispatch({ type: "GET_ERRORS", payload: {} });

        setAuthHeader(token);

        localStorage.setItem("jToken", token);
        const decodedUser = token_decoder(token);

        dispatch({
          type: "SET_CURRENT_USER",
          payload: decodedUser
        });

        getUserProfile(dispatch, history, true, decodedUser);
        getJournalData(dispatch, history, false, decodedUser);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({ type: "GET_ERRORS", payload: err.response.data });
          dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
        } else {
          dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
        }
      });
  };
}

export function logoutUser(showToast) {
  return dispatch => {
    localStorage.removeItem("jToken");
    setAuthHeader(false);
    dispatch({ type: "GET_ERRORS", payload: {} });
    dispatch({
      type: "SET_CURRENT_USER",
      payload: null
    });

    dispatch({
      type: "FETCH_USER_DETAILS",
      payload: {}
    });

    dispatch({ type: "INSERT_QUOTES", payload: [] });
    dispatch({ type: "INSERT_GOALS", payload: [] });
    dispatch({ type: "INSERT_TODOS", payload: [] });
    dispatch({ type: "INSERT_NOTES", payload: [] });
    dispatch({ type: "INSERT_MEMORY", payload: [] });
    dispatch({ type: "INSERT_ARTS", payload: [] });
    if (!showToast) dispatch({ type: "SHOW_TOAST", payload: "Logout Success" });
  };
}

export function forgotPassword(payload) {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user_auth/forgot_password", payload)
      .then(resp => {
        dispatch({ type: "GET_ERRORS", payload: {} });
        dispatch({ type: "FORGOT_PASSWORD", payload: true });
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({ type: "GET_ERRORS", payload: err.response.data });
          dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
        } else {
          dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
        }
      });
  };
}

export function verifyOTP(payload, history) {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user_auth/reset_password", payload)
      .then(resp => {
        dispatch({ type: "GET_ERRORS", payload: {} });
        dispatch({ type: "FORGOT_PASSWORD", payload: false });
        history.push("/login");
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch({ type: "GET_ERRORS", payload: err.response.data });
          dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
        } else {
          dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
        }
      });
  };
}
