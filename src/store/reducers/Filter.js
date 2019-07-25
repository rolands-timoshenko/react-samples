import { ACTIONS } from "../actions/Filter";
import createReducer from "../utils/createReducer";

// FIXME: move away from here. Allowed options to be stored
const allowedOptions = {
  controlsSummary: {
    groupBy: [
      "resourceType",
      "resourceCategory",
      "resource",
      "controlType",
      "controlCategory"
    ],
    sort: ["-total", "total"],
    limit: []
  },
  resourcesSummary: {
    groupBy: ["resourceType", "resourceCategory", "resource"],
    sort: ["-total", "total", "timestamp", "-timestamp"],
    timestamp: [],
    limit: []
  },
  policiesSummary: {
    groupBy: ["policyType", "controlCategory", "resource", "resourceType"],
    sort: ["-total", "total", "timestamp", "-timestamp"],
    timestamp: [],
    limit: []
  },
  permissionsFilter: {
    groupBy: ["resource", "identity"]
  }
};

const initialState = {
  filter: {},
  browseBy: {},
  scopeFilters: {},
  scopeFilterOrders: []
};

const filterReducerLiteral = {
  [ACTIONS.SET_BROWSE_BY]: (state, action) =>
    setBrowseBy(state, action.payload),
  [ACTIONS.SET_FILTER]: (state, action) => setFilter(state, action.payload),
  [ACTIONS.SET_SCOPE_FILTER_ITEM]: (state, action) =>
    setScopeFilterItem(state, action.payload),
  [ACTIONS.DELETE_SCOPE_FILTER_ITEM]: (state, action) =>
    deleteScopeFilterItem(state, action.payload),
  [ACTIONS.SET_SCOPE_FILTER_ORDERS]: (state, action) =>
    setScopeFilterOrders(state, action.payload.filters)
};

const setBrowseBy = (state, browseBy) => {
  return {
    ...state,
    browseBy
  };
};

const setFilter = (state, filter) => {
  return {
    ...state,
    filter: _buildNewStateFilter(filter, state.filter, allowedOptions)
  };
};

const setScopeFilterItem = (state, filter) => {
  return {
    ...state,
    scopeFilters: {
      ...state.scopeFilters,
      [filter.type]: filter.item
    }
  };
};

const deleteScopeFilterItem = (state, filter) => {
  const scopeFilters = { ...state.scopeFilters };
  delete scopeFilters[filter.type];
  return {
    ...state,
    scopeFilters
  };
};

const setScopeFilterOrders = (state, scopeFilters) => {
  return {
    ...state,
    scopeFilterOrders: scopeFilters
  };
};

const _buildNewStateFilter = (filter, stateFilter, allowedOptions) => {
  // Lets generate structure for new filter
  let newFilter = _buildNewStateFilterStructure(allowedOptions);

  // Lets apply filter coming from url into newly created
  newFilter = _spreadFilterIntoStateFilter(filter, newFilter, allowedOptions);

  // Lets apply filters from current state if it's still not set
  newFilter = _spreadStateFilterIntoStateFilter(stateFilter, newFilter);

  return { ...newFilter };
};

const _buildNewStateFilterStructure = allowedOptions => {
  const newFilter = {};
  Object.keys(allowedOptions).forEach(componentKey => {
    newFilter[componentKey] = {};
    Object.keys(allowedOptions[componentKey]).forEach(
      filterKey => (newFilter[componentKey][filterKey] = null)
    );
  });
  return newFilter;
};

const _spreadFilterIntoStateFilter = (filter, stateFilter, allowedOptions) => {
  Object.keys(stateFilter).forEach(componentKey => {
    Object.keys(stateFilter[componentKey]).forEach(filterKey => {
      const options = allowedOptions[componentKey][filterKey];
      const filterValue = filter[filterKey]
        ? Object.keys(filter[filterKey])[0]
        : null;
      if (
        filterValue &&
        (options.length < 1 || options.includes(filterValue))
      ) {
        stateFilter[componentKey][filterKey] = { [filterValue]: true };
      }
    });
  });
  return JSON.parse(JSON.stringify(stateFilter));
};

const _spreadStateFilterIntoStateFilter = (filter, stateFilter) => {
  Object.keys(stateFilter).forEach(componentKey => {
    Object.keys(stateFilter[componentKey]).forEach(filterKey => {
      if (
        !stateFilter[componentKey][filterKey] &&
        filter[componentKey] &&
        filter[componentKey][filterKey]
      ) {
        stateFilter[componentKey][filterKey] = filter[componentKey][filterKey];
      }
    });
  });
  return JSON.parse(JSON.stringify(stateFilter));
};

export const FilterReducer = createReducer(filterReducerLiteral, initialState);
