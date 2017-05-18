import { combineReducers } from 'redux';
import APP from './app';

const combinedReducer = combineReducers({
  ['app']: APP.reducer
});

export default (state, action) => {
  return combinedReducer(state, action);
};