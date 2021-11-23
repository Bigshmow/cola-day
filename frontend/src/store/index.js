import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";

// Reducers
import user from "./user";

// Sagas
import userSaga from "./user/sagas";

// Sagas configuration
const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
// Store configuration
const store = createStore(
  combineReducers({ user }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run sagas
sagaMiddleware.run(userSaga);

export default store;
