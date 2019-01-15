import axios from "axios";

export function saveJournal(type, data) {
  return function(dispatch) {
    let data_to_send = {
      ...data,
      journal_type: type
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/save_journal`, data_to_send)
      .then(d => {
        let to_save = d.data.journal_content;

        if (type === "quotes") {
          dispatch({
            type: "ADD_QUOTE",
            payload: to_save
          });
        }

        if (type === "goals") {
          dispatch({
            type: "ADD_GOAL",
            payload: to_save
          });
        }

        if (type === "todos") {
          dispatch({
            type: "ADD_TODO",
            payload: to_save
          });
        }

        if (type === "notes") {
          dispatch({
            type: "ADD_NOTE",
            payload: to_save
          });
        }

        dispatch({ type: "SHOW_TOAST", payload: "Added" });
      })
      .catch(e => {
        console.log(e.response);
      });
  };
}

export function deleteJournal(type, id) {
  return function(dispatch) {
    let data_to_send = {
      journal_id: id
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/delete_journal`, data_to_send)
      .then(d => {
        if (type === "quotes") {
          dispatch({
            type: "DELETE_QUOTE",
            payload: id
          });
        }

        if (type === "goals") {
          dispatch({
            type: "DELETE_GOAL",
            payload: id
          });
        }

        if (type === "todos") {
          dispatch({
            type: "DELETE_TODO",
            payload: id
          });
        }

        if (type === "notes") {
          dispatch({
            type: "DELETE_NOTE",
            payload: id
          });
        }

        dispatch({ type: "SHOW_TOAST", payload: "Deleted" });
      })
      .catch(e => {
        console.log(e.response);
      });
  };
}

export function toggleTodo(id, status, index) {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/flag_todos_goals", {
        journal_id: id,
        completed: status == "No" ? "Yes" : "No"
      })
      .then(resp => {
        dispatch({
          type: "TOGGLE_TODO",
          payload: index
        });
      })
      .catch(err => {
        if (err.response)
          dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
      });
  };
}

export function toggleGoal(id, status, index) {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/flag_todos_goals", {
        journal_id: id,
        completed: status == "No" ? "Yes" : "No"
      })
      .then(resp => {
        dispatch({
          type: "TOGGLE_GOAL",
          payload: index
        });
      })
      .catch(err => {
        if (err.response)
          dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
      });
  };
}
