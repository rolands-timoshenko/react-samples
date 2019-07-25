import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import TurbotModalFooterStyles from "./TurbotModalFooter.styles";
import { withStyles } from "@material-ui/core";

const TurbotModalFooter = ({ children, classes }) => {
  return <DialogActions classes={classes}>{children}</DialogActions>;
};

export default withStyles(TurbotModalFooterStyles)(TurbotModalFooter);
