import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TurbotModalContentStyles from "./TurbotModalContent.styles";
import { withStyles } from "@material-ui/core";

const TurbotModalContent = ({ children, classes }) => {
  return <DialogContent classes={classes}>{children}</DialogContent>;
};

export default withStyles(TurbotModalContentStyles)(TurbotModalContent);
