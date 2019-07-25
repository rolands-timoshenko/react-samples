import React from "react";
import { withStyles } from "@material-ui/core";
import PageContainerStyles from "./PageContainer.styles";

const propTypes = {};

const PageContainer = ({ classes, children }) => {
  return <main className={classes.root}>{children}</main>;
};

PageContainer.propTypes = propTypes;

export default withStyles(PageContainerStyles)(PageContainer);
