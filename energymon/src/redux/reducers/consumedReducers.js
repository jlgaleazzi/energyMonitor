import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function ConsumedReducer(
  state = initialState.consumedNow,
  action
) {
  switch (action.type) {
    case types.GET_CONSUMED_SUCCESS:
      return Object.assign({}, state, {
        consumedNow: action.kwh,
      });
    default:
      return state;
  }
}
