export const ACTIONS = {
  ADD_ITEM: "add_item"
};

export const createItemReducerLiteral = suffix => {
  return {
    [`${ACTIONS.ADD_ITEM}_${suffix}`]: (state, action) =>
      addItem(state, action.payload)
  };
};

/**
 * Inject item into store
 * @param {Object} state
 * @param {Object} item
 * @returns {Object}
 */
const addItem = (state, item) => {
  return item;
};
