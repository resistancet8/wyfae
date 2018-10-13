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
        todos: state.todos.filter(todo => todo._id !== payload)
      };
    }
    case "TOGGLE_TODO": {
      let updatedTodos = state.todos.slice();
      updatedTodos[payload].completed = !updatedTodos[payload].completed;

      return {
        todos: updatedTodos
      };
    }
    default:
      return state;
  }
}
