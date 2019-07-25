import { withStyles } from "@material-ui/core";
import React from "react";
import TurbotProcessStepperStyles from "./TurbotProcessStepper.styles";

const propTypes = {};

const TurbotProcessStepper = ({ classes, children }) => {
  const renderChildren = children => {
    // const count = React.Children.count(children);
    const steps = [];
    React.Children.forEach(children, child => steps.push(child));
    return steps;
  };

  return <div className={classes.root}>{renderChildren(children)}</div>;
};

TurbotProcessStepper.propTypes = propTypes;

export default withStyles(TurbotProcessStepperStyles)(TurbotProcessStepper);
