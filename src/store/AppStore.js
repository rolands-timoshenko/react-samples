import { FilterReducer } from "./reducers/Filter";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { AccessKeysReducer } from "./reducers/AccessKeys";
import { AuthReducer } from "./reducers/Auth";
import { PermissionsReducer } from "./reducers/Permissions";
import { SshKeysReducer } from "./reducers/SshKeys";
import { UserReducer } from "./reducers/User";

// Redux devtool
const isDev = `${process.env.NODE_ENV}`.toLowerCase().includes("dev");
const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// TODO: later change to redux-observables
// This middleware makes it possible to make async actions like api calls etc
const asyncActionMiddleWare = store => next => action => {
  if (typeof action === "function") {
    // Pass getState so async actions have access to state
    action(next, store.getState);
  } else {
    next(action);
  }
};

const customMiddleWare = composeEnhancers(
  applyMiddleware(asyncActionMiddleWare)
);

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    filters: FilterReducer,
    permissions: PermissionsReducer,
    profile: combineReducers({
      accessKeys: AccessKeysReducer,
      sshKeys: SshKeysReducer
    }),
    user: UserReducer
  }),
  customMiddleWare
);

export default store;
