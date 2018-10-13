import updateValidator from "./../helpers/update_validator";
import axios from "axios";

const apiBasePath = "http://159.89.171.16:9000";

export function updateUserProfile(userInfo, history) {
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
      dispatch({ type: "GET_ERRORS", payload: errors });
    }
  };
}
