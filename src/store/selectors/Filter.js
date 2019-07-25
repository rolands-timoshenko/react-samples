import { createSelector } from "reselect";

export const selectResourceFilter = createSelector(
  state => state.filters.scopeFilters,
  scopeFilters => scopeFilters.resource
);

export const selectPolicyTypeFilter = createSelector(
  state => state.filters.scopeFilters,
  scopeFilters => scopeFilters.policyType
);
