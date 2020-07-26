import { combineReducers } from "redux";
import solar from "./solarReducers";

const rootReducer = combineReducers({
  solar,
});

export default rootReducer;
