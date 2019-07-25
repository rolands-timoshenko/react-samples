import { ACTIONS } from "../actions/User";
import createReducer from "../utils/createReducer";

const initialState = {
  profile: null,
  processing: true
};

const userReducerLiteral = {
  [ACTIONS.SET_PROFILE]: (state, action) => ({
    ...state,
    profile: { ...action.payload }
  }),
  [ACTIONS.UNSET_PROFILE]: state => ({
    ...state,
    profile: null
  }),
  [ACTIONS.LOAD_PROFILE_PROCESSING]: (state, action) => ({
    ...state,
    processing: action.payload
  })
};

export const UserReducer = createReducer(userReducerLiteral, initialState);
