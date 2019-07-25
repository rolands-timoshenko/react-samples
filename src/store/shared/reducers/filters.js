import { filtersStringToObject } from "../../utils/transformFilters";

export const ACTIONS = {
  ADD_FILTER: "add_filter",
  UPDATE_FILTER: "update_filter",
  REMOVE_FILTER: "remove_filter"
};

export const createFilterReducerLiteral = suffix => {
  return {
    [`${ACTIONS.ADD_FILTER}_${suffix}`]: (state, action) =>
      addFilter(state, action.payload),
    [`${ACTIONS.UPDATE_FILTER}_${suffix}`]: (state, action) =>
      updateFilter(state, action.payload),
    [`${ACTIONS.REMOVE_FILTER}_${suffix}`]: (state, action) =>
      removeFilter(state, action.payload)
  };
};

/**
 * Replace filter with passed
 * @param {Object} state
 * @param {Object} param1
 * @param {string} param1.filterString
 * @returns {Object}
 */
const updateFilter = (state, { filterString }) => {
  return {
    ...filtersStringToObject(filterString)
  };
};

/**
 * Add/Replace filter key and value.
 * @param {Object} state
 * @param {Object} param1
 * @param {string} param1.key
 * @param {string} param1.value
 * @param {boolean} param1.replace
 * @returns {Object}
 */
const addFilter = (state, { key, value, replace }) => {
  const filters = { ...state };
  if (typeof filters[key] === "object") {
    if (replace) {
      filters[key] = {
        [value]: true
      };
    } else {
      filters[key][value] = true;
    }
  } else {
    filters[key] = { [value]: true };
  }
  return { ...filters };
};

/**
 * Remove filter key:value from filters
 * @param {Object} state
 * @param {Object} param1
 * @param {string} param1.key
 * @param {string} param1.value
 * @returns {Object}
 */
const removeFilter = (state, { key, value }) => {
  const filters = { ...state };
  delete filters[key][value];
  if (Object.keys(filters[key]).length < 1) {
    delete filters[key];
  }
  return { ...filters };
};
