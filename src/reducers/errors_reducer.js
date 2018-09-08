let initialState = { errors: {} };

function errorsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ERRORS":
      return {
        errors: payload
      };
    default:
      return state;
  }
}

export default errorsReducer;
