import AccessKeysApi from "../../api/AccessKeysApi";
import { filtersAsUrlQuery } from "../utils/transformFilters";
import { ACTIONS as LIST_ACTIONS } from "../shared/reducers/list";
import { ACTIONS as PAGING_ACTIONS } from "../shared/reducers/paging";
import { ACTIONS as PROCESSING_ACTIONS } from "../shared/reducers/processing";
import { ACTIONS as FILTER_ACTION } from "../shared/reducers/filters";

export const ACTIONS = {
  ADD_LIST: `${LIST_ACTIONS.ADD_LIST}_access_keys`,
  APPEND_LIST: `${LIST_ACTIONS.APPEND_LIST}_access_keys`,
  ADD_ITEM: `add_item_access_keys`,
  UPDATE_ITEM: `update_item_access_keys`,
  REMOVE_ITEM: `remove_item_access_keys`,
  SET_PAGING: `${PAGING_ACTIONS.SET_PAGING}_access_keys`,
  SET_PROCESSING_LIST: `${PROCESSING_ACTIONS.SET_PROCESSING}_access_keys`,
  ADD_FILTER: `${FILTER_ACTION.ADD_FILTER}_access_keys`,
  REMOVE_FILTER: `${FILTER_ACTION.REMOVE_FILTER}_access_keys`,
  SET_ERROR: `set_error_access_keys`
};

const api = new AccessKeysApi();

export const loadAccessKeysByFiltersAsync = (filters, next) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const { items, paging } = await api.loadAccessKeysAsync(filters, next);
      if (next) {
        dispatch({ type: ACTIONS.APPEND_LIST, payload: items });
      } else {
        dispatch({ type: ACTIONS.ADD_LIST, payload: items });
      }
      dispatch({ type: ACTIONS.SET_PAGING, payload: paging });
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: null
      });
    } catch (err) {
      dispatch({ type: ACTIONS.ADD_LIST, payload: [] });
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: `Error running filter "${filters}"`
      });
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

export const loadAccessKeysAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const query = filtersAsUrlQuery(getState().profile.accessKeys.filters);
      const resp = await api.loadAccessKeysAsync(query);
      dispatch({ type: ACTIONS.ADD_LIST, payload: resp });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.ADD_LIST, payload: [] });
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

export const addAccessKeysAsync = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const data = await api.addAccessKeysAsync();
      dispatch({ type: ACTIONS.ADD_ITEM, payload: data });
      return data;
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

export const updateAccessKeysAsync = (id, status) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const resp = await api.updateAccessKeysAsync(id, status);
      dispatch({ type: ACTIONS.UPDATE_ITEM, payload: resp });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

export const deleteAccessKeysAsync = id => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      await api.deleteAccessKeysAsync(id);
      dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};

// TODO: consider to make it sharable
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
