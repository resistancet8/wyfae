import isEmpty from "../helpers/isEmpty";

const initialState = {
  goals: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_GOALS":
      return {
        goals: payload
      };
    default:
      return state;
  }
}
