import {
  ADD_FLARE_SCORE,
  ADD_GET_SPIN_LIST,
  ADD_SPIN,
  REMOVE_SPIN_LIST, RESET_ANIMATION,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE
} from "./type";

export const addFlareScore = score =>{
  return{
    type: ADD_FLARE_SCORE,
    payload: score
  }
};

export const setFlareToken = flareToken => {
  return {
    type: SET_TOKEN_FLARE_SCORE,
    payload: flareToken
  }

};

export const setMegaToken = megaToken => {
  return {
    type: SET_TOKEN_MEGA_SCORE,
    payload: megaToken
  }
};

export const addSpin = spinType => {
  return {
    type: ADD_SPIN,
    payload: spinType
  }
};

export const addSpinList = addSpin => {
  return {
    type: ADD_GET_SPIN_LIST,
    payload: addSpin
  }
};

export const removeSpinList = removeSpin => {
  return {
    type: REMOVE_SPIN_LIST,
    payload: removeSpin
  }
};

export const resetAnimation = () => {
  return {
    type: RESET_ANIMATION,
    payload: -1,
  }
};

