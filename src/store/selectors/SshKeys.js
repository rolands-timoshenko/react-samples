import { createSelector } from "reselect";
import { filtersAsUrlQuery } from "../utils/transformFilters";

/**
 * Select list
 */
export const selectSshKeys = createSelector(
  state => state.profile.sshKeys.list,
  list => list
);

/**
 * Select list loading status
 */
export const selectSshKeysLoading = createSelector(
  state => state.profile.sshKeys.processing,
  processing => processing
);

/**
 * Select list filters as string
 */
export const selectFiltersAsString = createSelector(
  state => state.profile.sshKeys.filters,
  filters => filtersAsUrlQuery(filters)
);

/**
 * Select list filters
 */
export const selectFilters = createSelector(
  state => state.profile.sshKeys.filters,
  filters => filters
);
