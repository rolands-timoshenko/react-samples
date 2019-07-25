import React from "react";
import PropTypes from "prop-types";
import TurbotToggleButtonStyles from "./TurbotToggleButton.styles";
import { Button } from "react-bootstrap";
import { withStyles } from "@material-ui/core";

const propTypes = {
  variant: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

const TurbotToggleButton = ({
  classes,
  variant = "default",
  active = false,
  onClick,
  children
}) => {
  return (
    <Button
      variant={`turbot-${variant}`}
      className={classes.root}
      active={active}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

TurbotToggleButton.propTypes = propTypes;

export default withStyles(TurbotToggleButtonStyles)(TurbotToggleButton);
