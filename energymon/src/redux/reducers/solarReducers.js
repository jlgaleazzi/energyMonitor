import * as types from "../actions/actionTypes";
import initialState from "./initialState.js";

export default function SolarReducer(state = initialState.solarwNow, action) {
  switch (action.type) {
    case types.GET_SOLAR_SUCCESS:
      return Object.assign({}, state, {
        solarwNow: action.info.wNow,
        solarReadingTime: action.info.readingTime,
        solarWattsToday: action.info.whToday,
        solarWhLastSevenDays: action.info.whLastSevenDays,
      });
    default:
      return state;
  }
}
