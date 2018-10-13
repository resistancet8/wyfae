import updateValidator from "./../helpers/update_validator";
import axios from "axios";

const apiBasePath = "http://159.89.171.16:9000";

export function updateUserProfile(userInfo, history) {
  alert('sd')
  return dispatch => {
    let { isValid, errors } = updateValidator(userInfo);

    if (isValid) {
      dispatch({ type: "GET_ERRORS", payload: {} });

      axios
        .post(`${apiBasePath}/user/update_about`, userInfo)
        .then(response => {
          dispatch({ type: "GET_ERRORS", payload: {} });
          dispatch({ type: "UPDATE_PROFILE", payload: userInfo });
          dispatch({ type: "SHOW_TOAST", payload: "Updated" });
          history.push("/profile");
        })
        .catch(err => {
          dispatch({ type: "GET_ERRORS", payload: err.response.data });
        });
    } else {
      console.log(isValid, errors)
      dispatch({ type: "GET_ERRORS", payload: errors });
    }
  };
}

export function getUserProfile(dispatch, history, redirect, decodedUser) {
  axios
    .post(`${apiBasePath}/user/get_profile`, {
      profile_username: decodedUser.username,
      skip_count: 0
    })
    .then(response => {
      dispatch({ type: "GET_ERRORS", payload: {} });
      let profile_data = response.data;

      dispatch({
        type: "FETCH_USER_DETAILS",
        payload: Object.assign({}, profile_data.profile_data, { journal: {} })
      });

      if (redirect) {
        history.push("/");
      }
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: "GET_ERRORS", payload: err.response.data });
    });
}

export function getJournalData(dispatch, history, redirect, decodedUser) {
  axios
    .post(`${apiBasePath}/user/get_all_journal`, {
      profile_username: decodedUser.username,
      "skip_count": 0,
      "limit_count": 10
    })
    .then(response => {
      dispatch({ type: "GET_ERRORS", payload: {} });
      let journal_data = response.data;

      dispatch({ type: "INSERT_QUOTES", payload: journal_data.quotes });
      dispatch({ type: "INSERT_GOALS", payload: journal_data.goals });
      dispatch({ type: "INSERT_TODOS", payload: journal_data.todos });
      dispatch({ type: "INSERT_NOTES", payload: journal_data.notes });
      // store.dispatch({ type: "INSERT_MEMORY", payload: dummyData.memory });
      // store.dispatch({ type: "INSERT_ARTS", payload: dummyData.arts });

      if (redirect) {
        history.push("/");
      }

    })
    .catch(err => {
      console.log(err);
      dispatch({ type: "GET_ERRORS", payload: err.response.data });
    });
}