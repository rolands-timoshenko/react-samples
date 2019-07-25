export const ACTIONS = {
  SET_BROWSE_BY: "set_browse_by",
  SET_FILTER: "set_filter",
  SET_SCOPE_FILTER_ITEM: "set_scope_filter_item",
  DELETE_SCOPE_FILTER_ITEM: "delete_scope_filter_item",
  SET_SCOPE_FILTER_ORDERS: "set_scope_filter_orders"
};

export const setFilter = filter => {
  return { type: ACTIONS.SET_FILTER, payload: filter };
};

export const setBrowseBy = (browseBy, itemId) => {
  return { type: ACTIONS.SET_BROWSE_BY, payload: { mode: browseBy, itemId } };
};

export const setScopeFilterItem = (filterType, item) => {
  return {
    type: ACTIONS.SET_SCOPE_FILTER_ITEM,
    payload: { type: filterType, item }
  };
};

export const deleteScopeFilterItem = filterType => {
  return {
    type: ACTIONS.DELETE_SCOPE_FILTER_ITEM,
    payload: { type: filterType }
  };
};

export const setScopeFilterOrders = filters => {
  return {
    type: ACTIONS.SET_SCOPE_FILTER_ORDERS,
    payload: { filters }
  };
};
