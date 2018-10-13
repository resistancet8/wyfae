import axios from 'axios';

export function saveJournal(type, data){
  return function(dispatch){
    let data_to_send = {
      ...data,
      journal_type: type
    };

    axios.post(`http://159.89.171.16:9000/user/save_journal`, data_to_send).then(d => {
      let to_save = d.data.journal_content;
      
      if(type === 'quotes') {
        dispatch({
          type: "ADD_QUOTE",
          payload: to_save
        });
      }
  
      if(type === 'goals') {
        dispatch({
          type: "ADD_GOAL",
          payload: to_save
        });
      }

      if(type === 'todos') {
        dispatch({
          type: "ADD_TODO",
          payload: to_save
        });
      }

      if(type === 'notes') {
        dispatch({
          type: "ADD_NOTE",
          payload: to_save
        });
      }
  
      dispatch({ type: "SHOW_TOAST", payload: "Added" });
    })
    .catch(e => {
      console.log(e.response);
    })
  }
}

export function deleteJournal(type, id){
  return function(dispatch){

    let data_to_send = {
      journal_id: id
    };

    axios.post(`http://159.89.171.16:9000/user/delete_journal`, data_to_send).then(d => {
      
      if(type === 'quotes') {
        dispatch({
          type: "DELETE_QUOTE",
          payload: id
        });
      }
  
      if(type === 'goals') {
        dispatch({
          type: "DELETE_GOAL",
          payload: id
        });
      }

      if(type === 'todos') {
        dispatch({
          type: "DELETE_TODO",
          payload: id
        });
      }

      if(type === 'notes') {
        dispatch({
          type: "DELETE_NOTE",
          payload: id
        });
      }
  
      dispatch({ type: "SHOW_TOAST", payload: "Deleted" });
    })
    .catch(e => {
      console.log(e.response);
    })
  }
}

export function toggleTodo(index) {
  return function(dispatch) {
    dispatch({
      type: "TOGGLE_TODO",
      payload: index
    });
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