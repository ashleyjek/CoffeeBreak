import sessionReducer from "./session";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import uiReducer from "./ui";
import errorsReducer from "./errors";
import entitiesReducer from "./entities";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;