import isEmpty from "./../helpers/isEmpty";

const initialState = {
  isAdminAuthenticated: false,
  adminUser: {},
  admin_token: localStorage.getItem("admin_token") || ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_ADMIN_USER":
      return {
        ...state,
        isAdminAuthenticated: !isEmpty(payload),
        adminUser: payload
      };

    default:
      return state;
  }
}
