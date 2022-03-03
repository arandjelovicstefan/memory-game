const INITIAL_STATE = {
  cardItems: [],
};

const cardReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SHUFFLE_CARDS':
      return {
        ...state,
        cardItems: action.payload,
      };
    default:
      return state;
  }
};

export default cardReducer;
