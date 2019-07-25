import { withStyles } from "@material-ui/core";
import React from "react";
import TurbotActivityTitleStyles from "./TurbotActivityTitle.styles";

const TurbotActivityTitle = ({ classes, children }) => {
  return <span className={classes.root}>{children}</span>;
};

export default withStyles(TurbotActivityTitleStyles)(TurbotActivityTitle);
