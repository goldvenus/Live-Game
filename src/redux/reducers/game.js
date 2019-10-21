import { ADD_FLARE_SCORE } from "../action/type";

const initialState = {
  score: {
    flareScore: 0,
    playerPassScore: 0
  }
};

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLARE_SCORE:
      let addScore = {
        ...state.score,
        flareScore: state.score.flareScore + action.payload
      };
      return {
        ...state,
        flareScore: addScore
      };
    default :
      return state;
  }
};
export default GameReducer;