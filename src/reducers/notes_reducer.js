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
        notes: state.notes.filter(note => note._id !== payload)
      };
    default:
      return state;
  }
}
