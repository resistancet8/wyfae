let initialState = { user: {} };

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "FETCH_USER_DETAILS":
      return {
        user: payload
      };
    case "UPDATE_PROFILE":
      return {
        user: {
          ...state.user,
          fname: payload.fname,
          sname: payload.sur_name,
          dob: payload.dob,
          email: payload.email
        }
      };
    default:
      return state;
  }
}

export default userReducer;
