import { combineReducers } from "redux";
import { ACTIONS } from "../actions/AccessKeys";
import { createFilterReducerLiteral } from "../shared/reducers/filters";
import { createListReducerLiteral } from "../shared/reducers/list";
import { createPagingReducerLiteral } from "../shared/reducers/paging";
import { createProcessingReducerLiteral } from "../shared/reducers/processing";
import createReducer from "../utils/createReducer";

const accessKeysReducerLiteral = {
  [ACTIONS.ADD_ITEM]: (state, action) => addAccessKey(state, action.payload),
  [ACTIONS.UPDATE_ITEM]: (state, action) =>
    updateAccessKey(state, action.payload),
  [ACTIONS.REMOVE_ITEM]: (state, action) =>
    deleteAccessKey(state, action.payload)
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

/**
 * Update access key. Currently only
 * @param {AccessKeys} state
 * @param {Object} updatedAccessKey
 * @returns {AccessKeys}
 */
const updateAccessKey = (state, updatedAccessKey) => {
  const filteredAccessKeys = state.map(key => {
    return key.accessKeyId === updatedAccessKey.accessKeyId
      ? updatedAccessKey
      : key;
  });
  return [...filteredAccessKeys];
};

/**
 * Remove access key from list
 * @param {AccessKeys} state
 * @param {string} accessKeyId
 * @returns {AccessKeys}
 */
const deleteAccessKey = (state, accessKeyId) => {
  return [...state.filter(key => key.accessKeyId !== accessKeyId)];
};

export const AccessKeysReducer = combineReducers({
  list: createReducer(
    { ...accessKeysReducerLiteral, ...createListReducerLiteral("access_keys") },
    []
  ),
  error: createReducer(
    {
      [ACTIONS.SET_ERROR]: (state, action) => {
        return action.payload;
      }
    },
    null
  ),
  paging: createReducer({ ...createPagingReducerLiteral("access_keys") }, {}),
  filters: createReducer({ ...createFilterReducerLiteral("access_keys") }, {}),
  processing: createReducer(
    { ...createProcessingReducerLiteral("access_keys") },
    false
  )
});
