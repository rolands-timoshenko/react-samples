import { UI_URLS } from "../config/urls";

/**
 * Set key value pairs into query string and push onto history
 * @param {object} updates
 * @param {Object} location
 * @param {Object} history
 */

export const setInQueryString = (updates, location, history) => {
  const searchParams = new URLSearchParams(location.search);
  Object.entries(updates).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  history.push(`${location.pathname}?${searchParams.toString()}`);
};

/**
 * Delete keys from query string and push onto history
 * @param {array} keys
 * @param {Object} location
 * @param {Object} history
 */
export const removeFromQueryString = (keys, location, history) => {
  const searchParams = new URLSearchParams(location.search);
  keys.forEach(key => {
    searchParams.delete(key);
  });
  history.push(`${location.pathname}?${searchParams.toString()}`);
};

/**
 * Return current query string as an object
 * @param {Object} location
 */
export const getQueryStringAsObject = location => {
  const queryStringParams = new URLSearchParams(location.search);
  const state = {};
  for (let param of queryStringParams) {
    state[param[0]] = param[1];
  }
  return state;
};

export const getUrlSearchParams = location =>
  new URLSearchParams(location.search);

export const getUrlSearchParamsValue = (location, key) => {
  const urlSearchParams = getUrlSearchParams(location);
  return urlSearchParams.get(key);
};

export const clearSearchParams = (location, exceptions = []) => {
  const searchParams = getUrlSearchParams(location);
  for (let key of searchParams.keys()) {
    if (exceptions.includes(key)) {
      continue;
    }
    searchParams.delete(key);
  }
  return searchParams;
};

export const getScopeFilter = location => {
  // FIXME: repeating code. Could be moved to seperate function
  const searchParams = getUrlSearchParams(location);
  const filter = searchParams.get("filter");

  if (!filter) {
    return "";
  }
  const filterParts = filter.split(" ");
  const parsedFilterParts = [];
  for (let filterPart of filterParts) {
    const parts = filterPart.split(":");
    if (parts[1] === "turbotArtificialRoot") {
      continue;
    }
    parsedFilterParts.push(filterPart);
  }
  return `${parsedFilterParts.join(" ")}`;
};

export const getScopeFilterValue = (location, filterKey) => {
  const searchParams = getUrlSearchParams(location);
  const filter = searchParams.get("filter");
  if (!filter) {
    return null;
  }
  const filterParts = filter.split(" ");
  for (let filterPart of filterParts) {
    if (!filterPart.startsWith(`${filterKey}:`)) {
      continue;
    }
    const filterKeyParts = filterPart.split(":");
    return filterKeyParts[1];
  }
  return null;
};

export const addScopeFilterToSearchParams = (
  location,
  filterKey,
  id,
  addFilterInCurrentPosition = false
) => {
  const searchParams = getUrlSearchParams(location);
  const filter = searchParams.get("filter");
  if (!filter) {
    searchParams.set("filter", `${filterKey}:${id}`);
  } else {
    let updated = false;
    const newParts = [];
    const filterParts = filter.split(" ");
    for (let filterPart of filterParts) {
      if (filterPart.startsWith(`${filterKey}:`)) {
        if (addFilterInCurrentPosition) {
          newParts.push(`${filterKey}:${id}`);
          updated = true;
        }
      } else {
        newParts.push(filterPart);
      }
    }
    if (!updated) {
      newParts.push(`${filterKey}:${id}`);
    }
    searchParams.set("filter", newParts.join(" "));
  }

  return searchParams;
};

export const removeScopeFilterFromUrl = (location, history, filterKey) => {
  const searchParams = getUrlSearchParams(location);
  const filter = searchParams.get("filter");
  if (!filter) {
    return;
  }

  const newParts = [];
  const filterParts = filter.split(" ");
  for (let filterPart of filterParts) {
    if (!filterPart.startsWith(`${filterKey}:`)) {
      newParts.push(filterPart);
    }
  }
  searchParams.set("filter", newParts.join(" "));

  history.push(`${location.pathname}?${searchParams.toString()}`);
};

export const addScopeFilterToUrl = (
  location,
  history,
  filterKey,
  id,
  addFilterInCurrentPosition = false,
  withRouteRedirect = true
) => {
  const searchParams = addScopeFilterToSearchParams(
    location,
    filterKey,
    id,
    addFilterInCurrentPosition
  );

  let url = withRouteRedirect
    ? `${getSelectNavigateRoute(location.pathname)}?${searchParams.toString()}`
    : `${location.pathname}?${searchParams.toString()}`;

  history.push(url);
};

const getSelectNavigateRoute = pathname => {
  switch (pathname) {
    case UI_URLS.ACTIVITY:
    case UI_URLS.DIRECTORIES:
    case UI_URLS.OVERVIEW:
    case UI_URLS.PERMISSIONS:
    case UI_URLS.POLICIES:
    case UI_URLS.POLICIES_SETTINGS:
    case UI_URLS.POLICIES_VALUES:
    case UI_URLS.REPORTS:
    case UI_URLS.RESOURCES:
    case UI_URLS.CONTROLS:
      return pathname;
    default:
      return UI_URLS.RESOURCES;
  }
};

export const navigateToBreadcrumbUrl = (
  breadcrumbType,
  item,
  location,
  history,
  generateCleanNavigateUrl
) => {
  const updatedSearchParams = addScopeFilterToSearchParams(
    location,
    breadcrumbType,
    item.turbot.id
  );
  let path;
  switch (breadcrumbType) {
    case "controlType":
      path = UI_URLS.CONTROLS;
      break;
    case "policyType":
      path = UI_URLS.POLICIES;
      break;
    default:
      path = UI_URLS.RESOURCES;
  }
  history.push(
    generateCleanNavigateUrl(path, [
      {
        key: "filter",
        value: updatedSearchParams.get("filter")
      }
    ])
  );
};
