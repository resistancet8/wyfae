import axios from "axios";

export function getPosts() {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_all_trending`, {
        skip_count: 0,
        limit_count: 10
      })
      .then(response => {
        let posts = response.data.all_content || [];
        dispatch({ type: "INSERT_POSTS", payload: posts });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getMore(length) {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_all_trending`, {
        skip_count: length,
        limit_count: 10
      })
      .then(response => {
        let posts = response.data.all_content || [];
        dispatch({ type: "INSERT_MORE_POSTS", payload: posts });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
