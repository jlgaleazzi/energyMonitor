import * as types from "./actionTypes";
export function getSolarSuccess(solar) {
  return { type: types.GET_SOLAR_SUCCESS, solar };
}
