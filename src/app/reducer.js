import * as t from './actionTypes';

export const initialState = {
    loggedIn: false,
    beacons: []
};

export default (state = initialState, action) => {

  switch (action.type) {
      case t.LOG_IN:
        return { ...state, loggedIn: true }

      case t.SIGHTED_BEACON:
        return { ...state, beacons: [action.payload].concat(state.beacons) }

      case t.DEPARTED_BEACON:
        return { ...state }
        
      default:
        return state;
  }
};