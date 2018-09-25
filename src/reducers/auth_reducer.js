import isEmpty from "./../helpers/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  forgotPassword: false
};

export default function(state = initialState, { type, payload }) {
  console.log(payload);
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
    case "UPDATE_PROFILE": {
      return {
        ...state,
        user: {
          ...this.user,
          fname: payload.fname,
          sname: payload.sur_name,
          email: payload.email,
          dob: payload.dob
        }
      };
    }
    default:
      return state;
  }
}
