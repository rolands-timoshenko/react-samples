import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TurbotTimeDifference = ({ timestamp, style, className = "" }) => {
  const currentTimestamp = moment(new Date());
  const oldTimeStamp = moment(timestamp);
  const duration = moment.duration(currentTimestamp.diff(oldTimeStamp));

  const buildTimeString = (timePeriod, suffix) => {
    return timePeriod + `${suffix}`;
    //if (timePeriod === 1) return timePeriod + ` ${suffix}`;
    //else return timePeriod + ` ${suffix}s`;
  };

  const computeTimeString = duration => {
    const asHours = duration.asHours();
    if (asHours > 24) {
      return buildTimeString(Math.trunc(duration.asDays()), "d");
    } else if (asHours < 24 && asHours >= 1) {
      return buildTimeString(Math.trunc(asHours), "h");
    }
    // If it is less than an hour
    const asMinutes = duration.asMinutes();
    if (asMinutes >= 1) {
      return buildTimeString(Math.trunc(asMinutes), "m");
    } else {
      return `<1m`;
    }
  };

  const timeString = computeTimeString(duration);

  return (
    <span style={style} className={className} title={timestamp}>
      {timeString}
    </span>
  );
};

TurbotTimeDifference.propTypes = {
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  className: PropTypes.string
};

export default TurbotTimeDifference;
