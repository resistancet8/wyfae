// import isEmpty from "../helpers/isEmpty"

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
    case "DELETE_QUOTE": {
      return {
        quotes: state.quotes.filter(quote => quote._id !== payload)
      };
    }
    default:
      return state;
  }
}
