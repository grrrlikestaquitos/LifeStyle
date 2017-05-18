import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { autoRehydrate, persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import App from './App';
import APP from './app';

const { COLORS } = APP;

const createBirthdayStore = applyMiddleware(thunk)(createStore);
const store = autoRehydrate()(createBirthdayStore)(rootReducer);

const persistConfig = {
  storage: AsyncStorage,
  blacklist: ['app']
};

export default class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, persistConfig, () => {
      console.log(`Restored app state: ${JSON.stringify(store.getState())}`);
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <View style={{ backgroundColor: COLORS.white }} />;
    }

    return <Provider store={store}><App /></Provider>;
  }
}