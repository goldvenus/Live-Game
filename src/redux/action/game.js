import {ADD_FLARE_SCORE} from "./type";
export const addFlareScore = score =>{
  return{
    type: ADD_FLARE_SCORE,
    payload: score
  }
};