import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import TurbotIconButtonStyles from "./TurbotIconButton.styles";

const propTypes = {};

const TurbotIconButton = ({ classes, children, ...rest }) => {
  return (
    <IconButton classes={classes} {...rest}>
      {children}
    </IconButton>
  );
};

TurbotIconButton.propTypes = propTypes;

export default withStyles(TurbotIconButtonStyles)(TurbotIconButton);
