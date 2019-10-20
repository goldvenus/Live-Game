import {ADD_PLACE} from "./type";

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  }
}