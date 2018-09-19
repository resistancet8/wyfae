// import isEmpty from "../helpers/isEmpty"

const initialState = {
  todos: []
}

export default function(state = initialState , { type, payload }) {
  switch (type) {
    case 'INSERT_TODOS':
      return {
        todos: payload
      }
    case 'ADD_TODO':
      return {
        todos: [payload, ...state.todos]
      }

    case 'DELETE_TODO': {
      return {...state, state: this.setNewTodo(...state, payload)} ;
    }
    default:
      return state
  }
}

const setNewTodo = (todoList, payload) => {
  todoList.forEach((element) => {
    if (element.id === payload.id) {
      element.isDeleted = true;
    }
  })
  return todoList
}
