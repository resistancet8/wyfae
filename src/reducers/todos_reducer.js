// import isEmpty from "../helpers/isEmpty"

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

    case "DELETE_TODO": {
      return {
        todos: state.todos
          .splice(0, payload)
          .concat(state.todos.slice(payload + 1, state.todos.length))
      };
    }
    default:
      return state;
  }
}
