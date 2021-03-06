import updateValidator from "./../helpers/update_validator";
import axios from "axios";
import { logoutUser } from "./auth_actions";


export function updateUserProfile(userInfo, history) {
  return dispatch => {
    let { isValid, errors } = updateValidator(userInfo);

    if (isValid) {
      dispatch({ type: "GET_ERRORS", payload: {} });

      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/user/update_about`, userInfo)
        .then(response => {
          dispatch({ type: "GET_ERRORS", payload: {} });
          dispatch({ type: "UPDATE_PROFILE", payload: userInfo });
          dispatch({ type: "SHOW_TOAST", payload: "Updated" });
          history.push("/profile");
        })
        .catch(err => {
          if (err.response && err.response.data) {
            dispatch({
              type: "SHOW_TOAST",
              payload: err.response.data.msg + ", Please login again."
            });
            logoutUser(true)(dispatch);
          } else {
            dispatch({
              type: "SHOW_TOAST",
              payload: "Server Error, Please try again later"
            });
          }
        });
    } else {
      dispatch({ type: "GET_ERRORS", payload: errors });
    }
  };
}

export function getUserProfile(dispatch, history, redirect, decodedUser) {
  axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_profile`, {
      profile_username: decodedUser.username,
      skip_count: 0
    })
    .then(response => {
      dispatch({ type: "GET_ERRORS", payload: {} });
      let profile_data = response.data;

      dispatch({
        type: "FETCH_USER_DETAILS",
        payload: Object.assign({}, { ...profile_data.profile_data, star: profile_data.star, admin_message: profile_data.admin_message }, {
          journal: {},
          following: response.data.just_user || [],
          followers: response.data.ufm_just_user || []
        })
      });

      dispatch({
        type: "INSERT_ARTS",
        payload: profile_data.art_content
      });

      dispatch({
        type: "INSERT_MEMORY",
        payload: profile_data.memory_book
      });

      if (redirect) {
        history.push("/trending");
      }
    })
    .catch(err => {
      if (err.response && err.response.data) {
        if(err.response.data.status == '15') {
          localStorage.removeItem("jToken");
        }
        dispatch({
          type: "SHOW_TOAST",
          payload: err.response.data.msg + " Error, Please login again."
        });
      } else {
        dispatch({
          type: "SHOW_TOAST",
          payload: "Server Error, Please try again later"
        });
      }
    });
}

export function getJournalData(dispatch, history, redirect, decodedUser) {
  axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_all_journal`, {
      profile_username: decodedUser.username,
      skip_count: 0,
      limit_count: 10
    })
    .then(response => {
      dispatch({ type: "GET_ERRORS", payload: {} });
      let journal_data = response.data;

      dispatch({ type: "INSERT_QUOTES", payload: journal_data.quotes });
      dispatch({ type: "INSERT_GOALS", payload: journal_data.goals });
      dispatch({ type: "INSERT_TODOS", payload: journal_data.todos });
      dispatch({ type: "INSERT_NOTES", payload: journal_data.notes });

      if (redirect) {
        history.push("/trending");
      }
    })
    .catch(err => {
      if (err.response && err.response.data) {
        dispatch({
          type: "SHOW_TOAST",
          payload: err.response.data.msg
        });
        //logoutUser(true)(dispatch);
      } else {
        dispatch({
          type: "SHOW_TOAST",
          payload: "Server Error, Please try again later"
        });
      }
    });
}
