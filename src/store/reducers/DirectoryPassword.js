import createReducer from "../utils/createReducer";
import { combineReducers } from "redux";
import { ACTIONS } from "../actions/DirectoryPassword";
import { createListReducerLiteral } from "../shared/reducers/list";

const directoryPasswordReducerLiteral = {
  [ACTIONS.ADD_ITEM]: (state, action) => addAccessKey(state, action.payload)
};

/**
 * Append newly created access key
 * @param {AccessKeys} state
 * @param {Object} accessKey
 * @returns {AccessKeys}
 */
const addAccessKey = (state, accessKey) => {
  return [...state, accessKey];
};

export const AccessKeysReducer = combineReducers({
  list: createReducer(
    {
      ...directoryPasswordReducerLiteral,
      ...createListReducerLiteral("directory_password")
    },
    []
  ),
  error: createReducer(
    {
      [ACTIONS.SET_ERROR]: (state, action) => {
        return action.payload;
      }
    },
    null
  )
});
