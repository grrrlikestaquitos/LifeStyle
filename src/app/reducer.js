import * as t from './actionTypes';

export const initialState = {
    loggedIn: false,
    beaconList: []
};

export default (state = initialState, action) => {

  switch (action.type) {
      case t.LOG_IN:
        return { ...state, loggedIn: true }

      case t.ADD_NEW_BEACON:
        return { ...state, beaconList: state.beaconList.concat([action.payload])}

      case t.REMOVE_BEACON: 
        return { ...state, beaconList: state.beaconList.filter(beacon => beacon !== action.payload)}
        
      default:
        return state;
  }
};