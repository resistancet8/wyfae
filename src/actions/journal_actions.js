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

export function addNotes(note) {
  return function(dispatch) {
    dispatch({
      type: "ADD_NOTE",
      payload: note
    });
  };
}

export function deleteTodo(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_TODO",
      payload: index
    });
  };
}
export function deleteQuotes(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_QUOTE",
      payload: index
    });
  };
}

export function deleteGoals(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_GOAL",
      payload: index
    });
  };
}

export function deleteNotes(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_NOTE",
      payload: index
    });
  };
}
