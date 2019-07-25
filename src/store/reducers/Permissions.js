import { ACTIONS } from "../actions/Permissions";
import createReducer from "../utils/createReducer";

const initialState = {
  metadata: null,
  userPermissions: null
};

const permissionsReducerLiteral = {
  [ACTIONS.SET_PERMISSIONS_METADATA]: (state, action) => ({
    ...state,
    metadata: { ...action.payload }
  }),
  [ACTIONS.SET_USER_PERMISSIONS]: (state, action) => ({
    ...state,
    userPermissions: action.payload
  }),
  [ACTIONS.CLEAR_USER_PERMISSIONS]: state => ({
    ...state,
    userPermissions: null
  })
};

export const PermissionsReducer = createReducer(
  permissionsReducerLiteral,
  initialState
);
