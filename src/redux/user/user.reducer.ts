const INITIAL_STATE = {
  currentUser: null,
  turns: 0,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        turns: 0,
      };
    case 'SET_TURNS':
      return {
        ...state,
        turns: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
