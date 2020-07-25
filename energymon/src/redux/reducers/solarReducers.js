import * as types from '../actions/actionTypes';
import initialState from './initialState.js';

export default function SolarReducer(state = initialState.solar, action) {
    switch (action.type) {
        case types.GET_SOLAR_SUCCESS:
            return action.solar;
        default:
            return state;

    }
}