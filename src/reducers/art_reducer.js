let initialState = { arts: [] };

function artReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "PUBLISH_ART":
      return {
        arts: [payload, ...state.arts]
      };
    case "INSERT_ARTS":
      return {
        arts: payload
      };
    case "DELETE_ART":
      return {
        arts: state.arts.filter(o => o._id !== payload)
      };
      case "LOAD_ARTS":
      return {
        arts: [...state.arts, ...payload]
      };
    default:
      return state;
  }
}

export default artReducer;
