import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotCutTexttyles from "./TurbotCutText.styles";

const propTypes = {
  type: PropTypes.oneOf(["ellipsis"]),
  onClick: PropTypes.func,
  parentFit: PropTypes.bool
};

const TurbotCutText = ({ classes, children, parentFit = false, style }) => {
  const getRootClassName = classes => {
    const classNames = [];
    classNames.push(classes.root);
    parentFit && classNames.push(`${classes.root}--parentFit`);
    return classNames.join(" ");
  };

  return (
    <span className={getRootClassName(classes)} style={style}>
      {children}
    </span>
  );
};

TurbotCutText.propTypes = propTypes;

export default withStyles(TurbotCutTexttyles)(TurbotCutText);
