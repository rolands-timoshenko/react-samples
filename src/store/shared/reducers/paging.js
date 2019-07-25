export const ACTIONS = {
  SET_PAGING: "set_paging"
};

export const createPagingReducerLiteral = suffix => {
  return {
    [`${ACTIONS.SET_PAGING}_${suffix}`]: (state, action) =>
      setPaging(state, action.payload)
  };
};

/**
 * Set list pagination
 * @param {Object} state
 * @param {Object} paging
 * @returns {Object}
 */
const setPaging = (state, paging) => {
  return { ...paging };
};
