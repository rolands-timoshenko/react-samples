import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TypeTimestamp = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const propTypes = {
  timestamp: TypeTimestamp.isRequired,
  format: PropTypes.string
};

const TurbotTimeFormat = ({
  timestamp,
  format = "MM/DD/YYYY HH:mm a",
  ...rest
}) => {
  const transformedTimestamp = !isNaN(timestamp)
    ? Number(timestamp)
    : timestamp;
  return <span {...rest}>{moment(transformedTimestamp).format(format)}</span>;
};

TurbotTimeFormat.propTypes = propTypes;

export default TurbotTimeFormat;
