import axios from "axios";
import setAuthHeader from "./../helpers/setAuthTokens";
import token_decoder from "jwt-decode";
import registerValidator from "./../helpers/register_validator";
import updateValidator from "./../helpers/update_validator";
import { dummyData } from "./user_actions";
import * as t from "io-ts";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import { DateFromISOString } from "io-ts-types/lib/Date/DateFromISOString";

const apiBasePath = "http://159.89.171.16:9000";

export function registerUser(userData, history) {
  return function(dispatch) {
    let validator = registerValidator(userData);
    if (validator.isValid) {
      axios
        .post(`${apiBasePath}/user_auth/signup`, userData)
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
      .post(`${apiBasePath}/user_auth/login`, userData)
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

        dispatch({
          type: "FETCH_USER_DETAILS",
          payload: Object.assign({}, dummyData, { journal: {} })
        });

        dispatch({ type: "INSERT_QUOTES", payload: dummyData.journal.quotes });
        dispatch({ type: "INSERT_GOALS", payload: dummyData.journal.goals });
        dispatch({ type: "INSERT_TODOS", payload: dummyData.journal.todos });

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

    dispatch({
      type: "FETCH_USER_DETAILS",
      payload: {}
    });

    dispatch({ type: "INSERT_QUOTES", payload: [] });
    dispatch({ type: "INSERT_GOALS", payload: [] });
    dispatch({ type: "INSERT_TODOS", payload: [] });
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

export function updateUserProfile(userInfo) {
  return dispatch => {
    let { isValid, errors } = updateValidator(userInfo);

    if (isValid) {
      dispatch({ type: "GET_ERRORS", payload: {} });

      // api update

      // state update - redux
      dispatch({ type: "UPDATE_PROFILE", payload: userInfo });
    } else {
      dispatch({ type: "GET_ERRORS", payload: errors });
    }
  };
}
