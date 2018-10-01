let initialState = { arts: [] };

function artReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "PUBLISH_ART":
      return {
        arts: [...state.arts, payload]
      };
    case "INSERT_ARTS":
      return {
        arts: payload
      };
    default:
      return state;
  }
}

export default artReducer;
