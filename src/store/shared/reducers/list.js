export const ACTIONS = {
  ADD_LIST: "add_list",
  APPEND_LIST: "append_list"
};

export const createListReducerLiteral = suffix => {
  return {
    [`${ACTIONS.ADD_LIST}_${suffix}`]: (state, action) =>
      addList(state, action.payload),
    [`${ACTIONS.APPEND_LIST}_${suffix}`]: (state, action) =>
      appendList(state, action.payload)
  };
};

/**
 * Inject list into store
 * @param {Object} state
 * @param {Object[]} list
 * @returns {Object}
 */
const addList = (state, list) => {
  return [...list];
};

/**
 * Inject list into store
 * @param {Object} state
 * @param {Object[]} list
 * @returns {Object}
 */
const appendList = (state, list) => {
  return [...state, ...list];
};
