import isEmpty from "./../helpers/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
}
