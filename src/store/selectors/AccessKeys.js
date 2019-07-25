import { createSelector } from "reselect";
import { filtersAsUrlQuery } from "../utils/transformFilters";

/**
 * Select list
 */
export const selectAccessKeys = createSelector(
  state => state.profile.accessKeys.list,
  list => list
);

/**
 * Select list loading status
 */
export const selectAccessKeysLoading = createSelector(
  state => state.profile.accessKeys.processing,
  processing => processing
);

/**
 * Select list filters as string
 */
export const selectFiltersAsString = createSelector(
  state => state.profile.accessKeys.filters,
  filters => filtersAsUrlQuery(filters)
);

/**
 * Select list filters as string
 */
export const selectAccessKeysPaging = createSelector(
  state => state.profile.accessKeys.paging,
  paging => (paging && paging.next ? paging.next : null)
);

/**
 * Select list filters
 */
export const selectFilters = createSelector(
  state => state.profile.accessKeys.filters,
  filters => filters
);

/**
 * Select error
 */
export const selectAccessKeysError = createSelector(
  state => state.profile.accessKeys.error,
  error => error
);
