let initialState = { memory: [] };

function memoryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "PUBLISH_MEMORY":
      return {
        memory: [payload, ...state.memory]
      };
    case "INSERT_MEMORY":
      return {
        memory: payload
      };
    case "DELETE_MEMORY":
      return {
        memory: state.memory.filter(o => o._id !== payload)
      };
      case "LOAD_MEMORY":
      return {
        memory: [...state.memory, ...payload]
      };
    default:
      return state;
  }
}

export default memoryReducer;
