export function addTodo(todo) {
  return function(dispatch) {
    dispatch({
      type: "ADD_TODO",
      payload: todo
    });
    dispatch({ type: "SHOW_TOAST", payload: "Todo Added" });
  };
}

export function toggleTodo(index) {
  return function(dispatch) {
    dispatch({
      type: "TOGGLE_TODO",
      payload: index
    });
  };
}

export function addGoal(goal) {
  return function(dispatch) {
    dispatch({
      type: "ADD_GOAL",
      payload: goal
    });
    dispatch({ type: "SHOW_TOAST", payload: "Goal Added" });
  };
}

export function toggleGoal(index) {
  return function(dispatch) {
    dispatch({
      type: "TOGGLE_GOAL",
      payload: index
    });
  };
}

export function addQuote(quote) {
  return function(dispatch) {
    dispatch({
      type: "ADD_QUOTE",
      payload: quote
    });
    dispatch({ type: "SHOW_TOAST", payload: "Quote Added" });
  };
}

export function addNotes(note) {
  return function(dispatch) {
    dispatch({
      type: "ADD_NOTE",
      payload: note
    });
    dispatch({ type: "SHOW_TOAST", payload: "Note Added" });
  };
}

export function deleteTodo(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_TODO",
      payload: index
    });
    dispatch({ type: "SHOW_TOAST", payload: "Todo Deleted" });
  };
}
export function deleteQuotes(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_QUOTE",
      payload: index
    });
    dispatch({ type: "SHOW_TOAST", payload: "Quote Deleted" });
  };
}

export function deleteGoals(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_GOAL",
      payload: index
    });
    dispatch({ type: "SHOW_TOAST", payload: "Goal Deleted" });
  };
}

export function deleteNotes(index) {
  return dispatch => {
    dispatch({
      type: "DELETE_NOTE",
      payload: index
    });
    dispatch({ type: "SHOW_TOAST", payload: "Note Deleted" });
  };
}
