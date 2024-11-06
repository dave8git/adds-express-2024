// src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import postsReducer from './postsReducer';

// Combine reducers
const rootReducer = combineReducers({
  posts: postsReducer,
});

// Enable Redux DevTools if available, otherwise use Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store with middleware and DevTools
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

export default store;
