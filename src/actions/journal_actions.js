export function addTodo (todo) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_TODO',
      payload: todo
    })
  }
}

export function addGoal (goal) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_GOAL',
      payload: goal
    })
  }
}

export function addQuote (quote) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_QUOTE',
      payload: quote
    })
  }
}

// delete todo 

export function deleteTodo (todo) {
  console.log(todo)
  return (dispatch) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: todo
    })
  }
}
