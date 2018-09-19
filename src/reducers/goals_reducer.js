// import isEmpty from "../helpers/isEmpty"

const initialState = {
  goals: []
}

export default function(state = initialState , { type, payload }) {
  switch (type) {
    case 'INSERT_GOALS':
      return {
        goals: payload
      }
    case 'ADD_GOAL':
      return {
        goals: [payload, ...state.goals]
      }
    case 'DELETE_GOAL':
      return {
        goals: state.goals.splice(0, payload).concat(state.goals.slice(payload + 1, state.goals.length))
      }
    default:
      return state
  }
}
