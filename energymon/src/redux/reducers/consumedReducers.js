import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function ConsumedReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case types.GET_CONSUMED_SUCCESS:
      debugger;
      return Object.assign({}, state, {
        consumedNow: Number(action.info.watts).toFixed(2),
        temp: Number(action.info.tmp).toFixed(0),
      });
    default:
      return state;
  }
}
