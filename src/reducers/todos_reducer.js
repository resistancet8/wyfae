// import isEmpty from "../helpers/isEmpty";

const initialState = {
  todos: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_TODOS":
      return {
        todos: payload
      };
    case "ADD_TODO":
      return {
        todos: [payload, ...state.todos]
      };
    default:
      return state;
  }
}
