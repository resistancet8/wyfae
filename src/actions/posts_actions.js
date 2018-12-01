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

export function deleteMemory(data) {
  return function(dispatch) {
    dispatch({
      type: "DELETE_MEMORY",
      payload: data
    });
  };
}

export function deleteArt(data) {
  return function(dispatch) {
    dispatch({
      type: "PUBLISH_ART",
      payload: data
    });
  };
}
