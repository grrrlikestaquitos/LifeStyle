import * as t from './actionTypes';

export const login = () => ({ type: t.LOG_IN });

export const sightedBeacon = (beaconSN) => ({ type: t.SIGHTED_BEACON, payload: beaconSN });

export const departedBeacon = (beaconSN) => ({ type: t.DEPARTED_BEACON, payload: beaconSN });