import {
  ADD_APPLE_SPIN,
  ADD_FLARE_SCORE, ADD_GET_SPIN_LIST, ADD_LOCK_SPIN,
  ADD_MEGA_SPIN,
  ADD_NIKE_SPIN,
  ADD_SPIN, REMOVE_SPIN_LIST, RESET_ANIMATION,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE
} from "../action/type";
import concat from 'lodash/concat';
const initialState = {
  score: {
    flareScore: 0,
    playerPassScore: 0,
    megaSpin: 0,
    nikeSpin: 0,
    lockSpin: 0,
    appleSpin: 0
  },
  spinToken: {
    flareSpin: 0,
    megaSpin: 0
  },

  getSpinListItems: [],
  leftSpinUpdate: 0
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
        case ADD_APPLE_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              appleSpin: state.score.appleSpin + 1
            }
          };
        case ADD_LOCK_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              lockSpin: state.score.lockSpin + 1
            }
          };
        default :
          return state;
      }
    case ADD_GET_SPIN_LIST:
      if(state.getSpinListItems.filter(item=>item.megaType===action.payload.megaType).length>0) {
        return {
          ...state,
          leftSpinUpdate: state.getSpinListItems.findIndex(item=>item.megaType===action.payload.megaType)
        };
      }
      else {
        const addedItem = concat(...state.getSpinListItems, action.payload);
        return {
          ...state,
          getSpinListItems: addedItem,
          leftSpinUpdate: state.getSpinListItems.length
        };
      }
    case REMOVE_SPIN_LIST:
      return {
        ...state,
        getSpinListItems: state.getSpinListItems.filter(item=>item.megaType!==action.payload)
      };
    case RESET_ANIMATION :
      return {
        ...state,
        leftSpinUpdate: -1
      };
    default :
      return state;
  }
};
export default GameReducer;
