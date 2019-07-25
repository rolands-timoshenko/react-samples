import { ACTIONS } from "../actions/Auth";
import createReducer from "../utils/createReducer";

const initialState = {
  directories: [],
  directoryProcessing: false,
  token: null,
  redirectAfterLogin: null
};

const accessKeysReducerLiteral = {
  [ACTIONS.AUTH_ADD_DIRECTORIES]: (state, action) => ({
    ...state,
    directories: action.directories
  }),
  [ACTIONS.AUTH_PROCESSING_DIRECTORIES]: (state, action) => ({
    ...state,
    directoryProcessing: action.processing
  }),
  [ACTIONS.AUTH_SET_REDIRECT_ROUTE]: (state, action) => ({
    ...state,
    redirectAfterLogin: action.payload
  }),
  [ACTIONS.AUTH_SET_TOKEN]: (state, action) => ({
    ...state,
    token: action.token
  })
};

export const AuthReducer = createReducer(
  accessKeysReducerLiteral,
  initialState
);
