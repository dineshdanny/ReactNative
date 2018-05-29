import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import AppWithNavigationState, { middleware } from "./containers/AppNavigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootWatchers from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(rootWatchers);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
