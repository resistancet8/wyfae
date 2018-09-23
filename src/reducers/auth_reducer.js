import isEmpty from "./../helpers/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  forgotPassword: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    case "FORGOT_PASSWORD":
      return {
        ...state,
        forgotPassword: payload
      };
    default:
      return state;
  }
}
