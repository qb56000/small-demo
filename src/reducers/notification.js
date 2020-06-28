import actionTypes from "../actions/actionTypes";
let initState = {
  isLoading: false,
  list: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_NOTIFICATION:
      return {
        ...state,
        list: action.payload.list,
      };
    case actionTypes.Begin_MARK:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.END_MARK:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map((item) => {
        if (item.id === action.payload.id) {
          item.hasRead = true;
        }
        return item;
      });
      return {
        ...state,
        list: newList,
      };

    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        list: state.list.map((item) => {
          item.hasRead = true;

          return item;
        }),
      };
    default:
      return state;
  }
};
