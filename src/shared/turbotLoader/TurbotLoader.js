import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TurbotLoaderStyles from "./TurbotLoader.styles";

const propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
  inline: PropTypes.bool
};

const TurbotLoader = ({
  classes,
  color = null,
  size = 15,
  style,
  thickness = 5.0,
  inline = false
}) => {
  const internalStyle = {
    ...style,
    ...(color && { color: color })
  };

  const getClassName = inline => {
    const classNames = [];
    classNames.push(classes.root);
    inline
      ? classNames.push(`${classes.root}--inline`)
      : classNames.push(`${classes.root}--block`);
    return classNames.join(" ");
  };

  return (
    <div style={internalStyle} className={getClassName(inline)}>
      <CircularProgress color="inherit" thickness={thickness} size={size} />
    </div>
  );
};

TurbotLoader.propTypes = propTypes;

export default withStyles(TurbotLoaderStyles)(TurbotLoader);
