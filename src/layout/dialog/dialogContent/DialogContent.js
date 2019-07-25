import { withStyles } from "@material-ui/core";
import React from "react";
import DialogContentStyles from "./DialogContent.styles";

const propTypes = {};

const DialogContent = ({ classes, children }) => {
  return <div className={classes.root}>{children}</div>;
};

DialogContent.propTypes = propTypes;

export default withStyles(DialogContentStyles)(DialogContent);
