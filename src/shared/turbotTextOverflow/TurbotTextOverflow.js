import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  width: PropTypes.number
};

const TurbotTextOverflow = ({ children, maxWidth }) => {
  const style = {
    display: "block",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    ...(maxWidth && { maxWidth: maxWidth })
  };
  return <span style={style}>{children}</span>;
};

TurbotTextOverflow.propTypes = propTypes;

export default TurbotTextOverflow;
