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
          sname: payload.sname,
          dob: payload.dob,
          email: payload.email,
          from: {
            state: payload.state,
            city: payload.city,
            country: payload.country
          },
          contact: payload.contact,
          about: payload.about,
          langs: payload.langs,
          favorite_art: payload.favorite_art
        }
      };
    default:
      return state;
  }
}

export default userReducer;
