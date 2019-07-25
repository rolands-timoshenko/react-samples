import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  color: PropTypes.string
};

const StrokeBg = ({ color = "#000", strokeWidth = 5 }) => {
  return (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <line
          stroke={color}
          y2="0"
          x2="25"
          y1="25"
          x1="0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <line
          stroke={color}
          y2="0"
          x2="50"
          y1="50"
          x1="0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <line
          stroke={color}
          y2="25"
          x2="50"
          y1="50"
          x1="25"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </g>
    </svg>
  );
};

StrokeBg.propTypes = propTypes;

export default StrokeBg;
