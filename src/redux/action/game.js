import {
  ADD_SPIN_COINS_SCORE,
  ADD_GET_SPIN_LIST,
  ADD_SPIN,
  ADD_WAVE_SCORE,
  REMOVE_SPIN_LIST, RESET_ANIMATION,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE,
  ADD_PASS_SCORE
} from "./type";

export const addSpinCoinsScore = score =>{
  return{
    type: ADD_SPIN_COINS_SCORE,
    payload: score
  }
};

export const addWaveScore = score => {
  return {
    type: ADD_WAVE_SCORE,
    payload: score
  }
};

export const addPassScore = score => {
  return {
    type: ADD_PASS_SCORE,
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

export const addSpin = (spinType, score = 1) => {
  return {
    type: ADD_SPIN,
    payload: {
      spinType,
      score
    }
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


