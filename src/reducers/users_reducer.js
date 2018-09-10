let initialState = { user: {} };

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "FETCH_USER_DETAILS":
      return {
        user: payload
      };
    default:
      return state;
  }
}

export default userReducer;
