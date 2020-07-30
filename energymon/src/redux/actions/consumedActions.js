import * as types from "./actionTypes";
export function getConsumedSuccess(info) {
  return { type: types.GET_CONSUMED_SUCCESS, info };
}
