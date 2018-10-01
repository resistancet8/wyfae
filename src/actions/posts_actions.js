export function publishArt(data) {
  return function(dispatch) {
    dispatch({
      type: "PUBLISH_ART",
      payload: data
    });
  };
}

export function publishMemory(data) {
  return function(dispatch) {
    dispatch({
      type: "PUBLISH_MEMORY",
      payload: data
    });
  };
}
