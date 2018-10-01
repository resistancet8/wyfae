import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import errorsReducer from "./errors_reducer";
import userReducer from "./users_reducer";
import todosReducer from "./todos_reducer";
import goalsReducer from "./goals_reducer";
import quotesReducer from "./quotes_reducer";
import notesReducer from "./notes_reducer";
import generalReducer from "./general_reducer";
import artReducer from "./art_reducer";
import memoryReducer from "./memory_reducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  form,
  errors: errorsReducer,
  auth: authReducer,
  user: userReducer,
  quotes: quotesReducer,
  goals: goalsReducer,
  todos: todosReducer,
  notes: notesReducer,
  general: generalReducer,
  arts: artReducer,
  memory: memoryReducer
});
