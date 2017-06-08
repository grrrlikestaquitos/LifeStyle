import * as t from './actionTypes';

export const login = () => ({ type: t.LOG_IN });

export const addNewBeacon = (beacon) => ({ type: t.ADD_NEW_BEACON, payload: beacon });

export const removeBeacon = (beacon) => ({ type: t.REMOVE_BEACON, payload: beacon});

export const selectPlace = (place) => ({ type: t.PLACE_TEXTS, payload: place});
