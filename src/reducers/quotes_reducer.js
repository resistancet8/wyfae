// import isEmpty from "../helpers/isEmpty";

const initialState = {
  quotes: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_QUOTES":
      return {
        quotes: payload
      };
    case "ADD_QUOTE":
      return {
        quotes: [payload, ...state.quotes]
      };
    default:
      return state;
  }
}
