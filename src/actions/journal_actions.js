export function addTodo(todo) {
  return function(dispatch) {
    dispatch({
      type: "ADD_TODO",
      payload: todo
    });
  };
}

export function addGoal(goal) {
  return function(dispatch) {
    dispatch({
      type: "ADD_GOAL",
      payload: goal
    });
  };
}

export function addQuote(quote) {
  return function(dispatch) {
    dispatch({
      type: "ADD_QUOTE",
      payload: quote
    });
  };
}

// delete todo
export function deleteTodo(index) {
  // here update at the endpoint code. then dispatch action locally.
  return dispatch => {
    dispatch({
      type: "DELETE_TODO",
      payload: index
    });
  };
}
export function deleteQuotes(index) {
  // here update at the endpoint code. then dispatch action locally.
  return dispatch => {
    dispatch({
      type: "DELETE_QUOTE",
      payload: index
    });
  };
}
export function deleteGoals(index) {
  // here update at the endpoint code. then dispatch action locally.
  return dispatch => {
    dispatch({
      type: "DELETE_GOAL",
      payload: index
    });
  };
}

// also add delete for quotes, goals.ok great.bye bye gn. be bro
