import axios from "axios";
const apiBasePath = "http://159.89.171.16:9000";

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

export function getMoreArts(length, user) {
  return function(dispatch) {
    axios
      .post(`${apiBasePath}/user/load_profile_post`, {
        "profile_username": user,
        "post_type": "art", 
        "skip_count": length
      })
      .then(response => {
        let posts = response.data.art_content || [];
        dispatch({ type: "LOAD_ARTS", payload: posts });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getMoreMemories(length, user) {
  return function(dispatch) {
    axios
      .post(`${apiBasePath}/user/load_profile_post`, {
        "profile_username": user,
        "post_type": "memory_book", 
        "skip_count": length
      })
      .then(response => {
        let posts = response.data.memory_book || [];
        dispatch({ type: "LOAD_MEMORY", payload: posts });
      })
      .catch(err => {
        console.log(err);
      });
  };
}