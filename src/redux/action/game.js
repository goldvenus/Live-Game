import {
  ADD_SPIN_COINS_SCORE,
  ADD_GET_SPIN_LIST,
  ADD_SPIN,
  ADD_WAVE_SCORE,
  REMOVE_SPIN_LIST, RESET_ANIMATION,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE,
  ADD_PASS_SCORE, ADD_ALL_BULLET_FLARE,
} from './type';

export const addSpinCoinsScore = (score) => ({
  type: ADD_SPIN_COINS_SCORE,
  payload: score,
});

export const addWaveScore = (score) => ({
  type: ADD_WAVE_SCORE,
  payload: score,
});

export const addPassScore = (score) => ({
  type: ADD_PASS_SCORE,
  payload: score,
});

export const setFlareToken = (flareToken) => ({
  type: SET_TOKEN_FLARE_SCORE,
  payload: flareToken,
});

export const setMegaToken = (megaToken) => ({
  type: SET_TOKEN_MEGA_SCORE,
  payload: megaToken,
});

export const addSpin = (spinType, score = 1) => ({
  type: ADD_SPIN,
  payload: {
    spinType,
    score,
  },
});

export const addSpinList = (addSpinObject) => ({
  type: ADD_GET_SPIN_LIST,
  payload: addSpinObject,
});

export const removeSpinList = (removeSpin) => ({
  type: REMOVE_SPIN_LIST,
  payload: removeSpin,
});

export const resetAnimation = () => ({
  type: RESET_ANIMATION,
  payload: -1,
});

export const addBulletFlare = (bulletFlare) => ({
  type: ADD_ALL_BULLET_FLARE,
  payload: bulletFlare,
});
