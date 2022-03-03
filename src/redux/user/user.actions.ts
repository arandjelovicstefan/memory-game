export const setCurrentUser = (user: any) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  };
};

export const setTurns = (turns: any) => {
  return {
    type: 'SET_TURNS',
    payload: turns,
  };
};
