let initialState = { memory: [] };

function memoryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "PUBLISH_MEMORY":
      return {
        memory: [...state.memory, payload]
      };
    case "INSERT_MEMORY":
      return {
        memory: payload
      };
    default:
      return state;
  }
}

export default memoryReducer;