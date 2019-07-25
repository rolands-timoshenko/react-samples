export const ACTIONS = {
  SET_PROCESSING: "set_processing"
};

export const createProcessingReducerLiteral = suffix => {
  return {
    [`${ACTIONS.SET_PROCESSING}_${suffix}`]: (state, action) =>
      setProcessing(state, action.payload)
  };
};

/**
 * Set status for processing list
 * @param {Object} state
 * @param {boolean} loading
 * @returns {Object}
 */
const setProcessing = (state, loading) => {
  return loading;
};
