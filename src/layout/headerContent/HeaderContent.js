import React from "react";
import HeaderContentStyles from "./HeaderContent.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const HeaderContent = ({ children, classes }) => {
  return <div className={classes.root}>{children}</div>;
};

export default withStyles(HeaderContentStyles)(HeaderContent);
