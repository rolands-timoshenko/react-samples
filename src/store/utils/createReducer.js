/**
 * Create reducer
 * @param {Object} mapError
 * @param {any} defaultState
 * @returns {Object}
 */
export default (map, defaultState) => {
  return (state = defaultState, action) =>
    map[action.type] ? map[action.type](state, action) : state;
};
