import { combineReducers } from "redux";
import solar from "./solarReducers";
import consumed from "./consumedReducers";

const rootReducer = combineReducers({
  solar,
  consumed,
});

export default rootReducer;
