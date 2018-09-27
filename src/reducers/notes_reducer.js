const initialState = {
  notes: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_NOTES":
      return {
        notes: payload
      };
    case "ADD_NOTE":
      return {
        notes: [payload, ...state.notes]
      };
    case "DELETE_NOTE":
      return {
        ...state.notes,
        notes: state.notes
          .splice(0, payload)
          .concat(state.notes.slice(1, state.notes.length))
      };
    default:
      return state;
  }
}
