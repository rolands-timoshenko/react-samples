import SshKeysApi from "../../api/SshKeysApi";
import { filtersAsUrlQuery } from "../utils/transformFilters";
import { ACTIONS as LIST_ACTIONS } from "../shared/reducers/list";
import { ACTIONS as PAGING_ACTIONS } from "../shared/reducers/paging";
import { ACTIONS as PROCESSING_ACTIONS } from "../shared/reducers/processing";
import { ACTIONS as FILTER_ACTION } from "../shared/reducers/filters";

export const ACTIONS = {
  ADD_LIST: `${LIST_ACTIONS.ADD_LIST}_ssh_keys`,
  APPEND_LIST: `${LIST_ACTIONS.APPEND_LIST}_ssh_keys`,
  ADD_ITEM: `add_item_ssh_keys`,
  UPDATE_ITEM: `update_item_ssh_keys`,
  REMOVE_ITEM: `remove_item_ssh_keys`,
  SET_PAGING: `${PAGING_ACTIONS.SET_PAGING}_ssh_keys`,
  SET_PROCESSING_LIST: `${PROCESSING_ACTIONS.SET_PROCESSING}_ssh_keys`,
  ADD_FILTER: `${FILTER_ACTION.ADD_FILTER}_ssh_keys`,
  REMOVE_FILTER: `${FILTER_ACTION.REMOVE_FILTER}_ssh_keys`,
  UPDATE_FILTER: `${FILTER_ACTION.UPDATE_FILTER}_ssh_keys`
};
const api = new SshKeysApi();

export const loadSshKeysByFiltersAsync = filters => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      // const query = filtersAsUrlQuery(filters);
      const resp = await api.loadListAsync(filters);
      dispatch({ type: ACTIONS.ADD_LIST, payload: resp });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.ADD_LIST, payload: [] });
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

/**
 * Generate async action. Loads ssh keys
 * @returns {Promise}
 */
export const loadSshKeysAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const query = filtersAsUrlQuery(getState().profile.sshKeys.filters);
      const resp = await api.loadListAsync(query);
      dispatch({ type: ACTIONS.ADD_LIST, payload: resp });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

/**
 * Generate async action. Add's new ssh key.
 * @returns {Object} new ssh key
 */
export const addSshKeyAsync = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const data = await api.addItemAsync();
      dispatch({ type: ACTIONS.ADD_ITEM, payload: data });
      return data;
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

/**
 * Generate async action. Update ssh key status
 * @param {string} id
 * @param {boolean} status
 * @returns {Promise}
 */
export const updateSshKeysAsync = (id, status) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const resp = await api.updateItemAsync(id, status);
      dispatch({ type: ACTIONS.UPDATE_ITEM, payload: resp });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

/**
 * Generate async action. Removes ssh key
 * @param {string} id
 * @returns {Promise}
 */
export const deleteSshKeysAsync = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      await api.deleteItemAsync(id);
      dispatch({ type: ACTIONS.DELETE_ITEM, payload: id });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {Object} payload
 */

/**
 * Will Generate Update Action object to dispatch
 * @param {string} filterString
 * @returns {Action}
 */
export const updateFilter = filterString => {
  return {
    type: ACTIONS.UPDATE_FILTER,
    payload: { filterString: filterString }
  };
};

/**
 * Generate add action object
 * @param {string} key
 * @param {string} value
 * @param {boolean} replace
 * @returns {Action}
 */
export const addFilter = (key, value, replace = false) => {
  return {
    type: ACTIONS.ADD_FILTER,
    payload: { key: key, value: value, replace: replace }
  };
};

/**
 * Generate remove action object
 * @param {string} key
 * @param {string} value
 */
export const removeFilter = (key, value) => {
  return {
    type: ACTIONS.REMOVE_FILTER,
    payload: { key: key, value: value }
  };
};
