const initialState = {
  posts: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "INSERT_POSTS":
      return {
        ...state,
        posts: payload
      };
    case "INSERT_MORE_POSTS":
      return {
        ...state,
        posts: [...state.posts, ...payload]
      };
    default:
      return state;
  }
}
