import * as t from './actionTypes';
import { PLACE_TEXTS } from './constants';

export const initialState = {
    loggedIn: false,
    beaconList: [],
    selectedPlaceArray: []
};

export default (state = initialState, action) => {

  switch (action.type) {
      case t.LOG_IN:
        return { ...state, loggedIn: true };

      case t.ADD_NEW_BEACON:
        return { ...state, beaconList: state.beaconList.concat([action.payload])};

      case t.REMOVE_BEACON: 
        return { ...state, beaconList: state.beaconList.filter(beacon => beacon !== action.payload)};

      case t.SELECTED_PLACE: {
        switch (action.payload) {
          case 'bed':
            return { ...state, selectedPlaceArray: PLACE_TEXTS.bedroom };
        
          case 'restroom':
            return { ...state, selectedPlaceArray: PLACE_TEXTS.restroom };

          case 'workspace':
            return { ...state, selectedPlaceArray: PLACE_TEXTS.workspace };

          default:
            break;
        }
      }
        
      default:
        return state;
  }
};