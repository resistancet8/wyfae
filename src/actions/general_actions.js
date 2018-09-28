export function showToast(message) {
  return function(dispatch) {
    dispatch({
      type: "SHOW_TOAST",
      payload: message
    });
  };
}
