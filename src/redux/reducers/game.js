import {
  ADD_FLARE_SCORE,
  ADD_MEGA_SPIN,
  ADD_NIKE_SPIN,
  ADD_SPIN,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE
} from "../action/type";

const initialState = {
  score: {
    flareScore: 0,
    playerPassScore: 0,
    megaSpin: 0,
    nikeSpin: 0
  },
  spinToken: {
    flareSpin: 0,
    megaSpin: 0
  }
};

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLARE_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          flareScore: state.score.flareScore + parseInt(action.payload)
        }
      };
    case SET_TOKEN_FLARE_SCORE:
      return {
        ...state,
        spinToken: {
          ...state.spinToken,
          flareSpin: action.payload
        }
      };
    case SET_TOKEN_MEGA_SCORE:
      return {
        ...state,
        spinToken: {
          ...state.spinToken,
          megaSpin: action.payload
        }
      };
    case ADD_SPIN:
      switch (action.payload) {
        case ADD_MEGA_SPIN:
          return {
            ...state,
            score: {
              ...state.score,
              megaSpin: state.score.megaSpin + 1
            }
          };
        case ADD_NIKE_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              nikeSpin: state.score.nikeSpin + 1
            }
          };
        default :
          return state;
      }
    default :
      return state;
  }
};
export default GameReducer;