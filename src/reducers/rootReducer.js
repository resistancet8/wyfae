import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import errorsReducer from "./errors_reducer";
import userReducer from "./users_reducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  form,
  errors: errorsReducer,
  auth: authReducer,
  user: userReducer
});
