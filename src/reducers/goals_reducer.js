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
        goals: state.goals.filter(goal => goal._id !== payload)
      };
    case "TOGGLE_GOAL": {
      let updatedGoals = state.goals.slice();
      updatedGoals[payload].completed = updatedGoals[payload].completed == "No" ? "Yes": "No";

      return {
        goals: updatedGoals
      };
    }
    default:
      return state;
  }
}
