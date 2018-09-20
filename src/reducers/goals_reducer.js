// import isEmpty from "../helpers/isEmpty"

const initialState = {
  goals: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_GOALS":
      return {
        goals: payload
      };
    case "ADD_GOAL":
      return {
        goals: [payload, ...state.goals]
      };
    case "DELETE_GOAL":
      return {
        ...state.goals,
        goals: state.goals
          .splice(0, payload)
          .concat(state.goals.slice(1, state.goals.length))
      };
    default:
      return state;
  }
}
