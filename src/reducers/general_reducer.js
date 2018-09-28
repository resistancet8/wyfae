const initialState = {
  general: {
    toast: {
      show: false,
      message: ""
    }
  }
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case "SHOW_TOAST":
      return {
        general: {
          toast: {
            show: true,
            message: payload
          }
        }
      };

    case "CLOSE_TOAST":
      return {
        general: {
          toast: {
            show: false,
            message: ""
          }
        }
      };
    default:
      return state;
  }
}
