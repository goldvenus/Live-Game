import { ADD_FLARE_SCORE, ADD_SPIN, SET_TOKEN_FLARE_SCORE, SET_TOKEN_MEGA_SCORE } from "./type";

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
}

