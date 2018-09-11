import isEmpty from "../helpers/isEmpty";

const initialState = {
  todos: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_TODOS":
      return {
        todos: payload
      };
    default:
      return state;
  }
}
