import * as types from "./actionTypes";
import * as solarApi from "../../api/solarAPI";
import { beginApiCall, apiCallError } from "./apiStatusTypes";

export function getSolarSuccess(solar) {
  return { type: types.GET_SOLAR_SUCCESS, solar };
}

export function getSolar() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return solarApi
      .getSolar()
      .then((solar) => {
        dispatch(getSolarSuccess(solar));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
