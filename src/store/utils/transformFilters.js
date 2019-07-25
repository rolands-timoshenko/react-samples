/**
 * Transform filters string into object
 * @param {string} filtersString
 * @returns {Object}
 */
export function filtersStringToObject(filtersString) {
  let filters = {};

  filtersString !== null &&
    filtersString.split(" ").forEach(filter => {
      if (filter.split(":").length === 2) {
        let [key, values] = filter.split(":");
        if (key && values) {
          values.split(",").forEach(value => {
            typeof filters[key] === "object"
              ? (filters[key][value] = true)
              : (filters[key] = { [value]: true });
          });
        } else if (key) {
          filters[key] = "";
        }
      } else {
        filters[filter] = "";
      }
    });
  return filters;
}

/**
 * Transform filters object into url query
 * @param {Object} filters
 * @returns {string}
 */
export function filtersAsUrlQuery(filters) {
  let queryStrings = [];
  Object.keys(filters).forEach(key => {
    let values = Object.keys(filters[key]);
    if (values.length > 0) {
      queryStrings.push(`${key}:${values.join(",")}`);
    } else {
      queryStrings.push(`${key}`);
    }
  });
  return queryStrings.join(" ");
}

/**
 * Transform sort by dehydrated reference
 * @param {array} items to be sorted
 * @param {array} order to sort by
 * @returns {array}
 */
export function sortByDehydratedReference(items, order) {
  let sortedItems = [];
  order.forEach(sort => {
    items.forEach(item => {
      if (sort === item.uri) {
        sortedItems.push(item);
      }
    });
  });
  return sortedItems;
}
