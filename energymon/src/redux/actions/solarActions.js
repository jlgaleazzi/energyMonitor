import * as types from "./actionTypes";
export function getSolarSuccess(info) {
  return { type: types.GET_SOLAR_SUCCESS, info };
}
