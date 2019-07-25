import { combineReducers } from "redux";
import { ACTIONS } from "../actions/SshKeys";
import { createFilterReducerLiteral } from "../shared/reducers/filters";
import { createListReducerLiteral } from "../shared/reducers/list";
import { createPagingReducerLiteral } from "../shared/reducers/paging";
import { createProcessingReducerLiteral } from "../shared/reducers/processing";
import createReducer from "../utils/createReducer";

const sshKeysReducerLiteral = {
  [ACTIONS.ADD_ITEM]: (state, action) => addSshKey(state, action.payload),
  [ACTIONS.UPDATE_ITEM]: (state, action) => updateSshKey(state, action.payload),
  [ACTIONS.DELETE_ITEM]: (state, action) => deleteSshKey(state, action.payload)
};

/**
 * Append newly created ssh key
 * @param {SshKeys} state
 * @param {Object} item
 * @returns {SshKeys}
 */
const addSshKey = (state, item) => {
  return [...state, item];
};

/**
 * Update ssh key. Currently only
 * @param {SshKeys} state
 * @param {Object} updatedItem
 * @returns {SshKeys}
 */
const updateSshKey = (state, updatedItem) => {
  const filteredList = state.map(key => {
    return key.accessKeyId === updatedItem.accessKeyId ? updatedItem : key;
  });
  return [...filteredList];
};

/**
 * Remove ssh key from list
 * @param {SshKeys} state
 * @param {string} itemId
 * @returns {SshKeys}
 */
const deleteSshKey = (state, itemId) => {
  return [...state.filter(key => key.accessKeyId !== itemId)];
};

export const SshKeysReducer = combineReducers({
  list: createReducer(
    { ...sshKeysReducerLiteral, ...createListReducerLiteral("ssh_keys") },
    []
  ),
  paging: createReducer({ ...createPagingReducerLiteral("ssh_keys") }, {}),
  filters: createReducer({ ...createFilterReducerLiteral("ssh_keys") }, {}),
  processing: createReducer(
    { ...createProcessingReducerLiteral("ssh_keys") },
    false
  )
});
