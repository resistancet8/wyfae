import isEmpty from "../helpers/isEmpty";

const initialState = {
  quotes: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_QUOTES":
      return {
        quotes: payload
      };
    default:
      return state;
  }
}
