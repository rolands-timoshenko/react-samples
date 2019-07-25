import moment from "moment";

export const tick = (ms = 1000) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

// How to use
// const sortOptions = ["state:alarm", "state:error", "state:invalid", "state:ok", "state:skipped", "state:insufficient_data", "state:tbd"];
// array.sort(sort("filter", sortOptions));
export const arraySort = (key, options) => (a, b) => {
  const aIndex = options.findIndex(item => item === a[key]);
  const bIndex = options.findIndex(item => item === b[key]);
  return aIndex - bIndex;
};

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const ReactIsInDevelomentMode = React => {
  return "_self" in React.createElement("div");
};

export const TurbotNumberFormatter = num => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 100000) {
    return Math.round(num / 1000) + "k";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  if (num < 1000) {
    //display number as is but separated with commas
    return num.toLocaleString("en");
  }
  return num;
};

export const computeDefaultDate = datetime => {
  // Check whether the passed down value is a datetime string
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  if (Date.parse(datetime)) return moment(datetime).format("YYYY-MM-DDTHH:mm");

  const defaultDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DDTHH:mm");

  return defaultDate;
};

export const computeISODateTime = datetime => {
  return moment(datetime).toISOString();
};

export const computeRelativeTimeFromNow = relativeTime => {
  // RelativeTime can be `1 day`, `5 hours`, `45 minutes` etc

  if (relativeTime === "custom") {
    return moment()
      .add(1, "hour")
      .toISOString();
  }

  if (relativeTime === "" || relativeTime === "Never") return "";
  const [count, metric] = relativeTime.split(" ");

  return moment()
    .add(Number(count), metric)
    .toISOString();
};

/**
 * Check if string and if not empty
 * @param {String} string string to check
 * @returns {Boolean}
 */
export const isNotEmptyString = string =>
  typeof string === "string" && string.trim() !== "";

/**
 * Creating button text dynamically for modal which have multiple states and loading
 * @param {boolean} state
 * @param {boolean} loading
 * @param {String} currentText
 * @param {String} nextText
 */

export const turbotButtonTitle = (state, loading, currentText, nextText) => {
  if (state && loading) {
    if (nextText.endsWith("e")) {
      return `${nextText.slice(0, -1)}ing...`;
    } else {
      return `${nextText}ing...`;
    }
  }
  if (state && !loading) {
    return `${nextText}`;
  }
  if (!state && loading) {
    if (currentText.endsWith("e")) {
      return `${currentText.slice(0, -1)}ing...`;
    } else {
      return `${currentText}ing...`;
    }
  }
  if (!state && !loading) {
    return `${currentText}`;
  }
};

// Check if object's Props are empty or not

export const areObjectsPropertiesEmpty = obj => {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "") return false;
  }
  return true;
};
