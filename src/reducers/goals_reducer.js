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
    case "TOGGLE_GOAL": {
      let updatedGoals = state.goals.slice();
      updatedGoals[payload].completed = !updatedGoals[payload].completed;

      return {
        goals: updatedGoals
      };
    }
    default:
      return state;
  }
}
