import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import BrowseDividerStyles from "./BrowseDivider.styles";

const propTypes = {};

const BrowseDivider = ({ classes }) => {
  const dividerClasses = {
    root: classes.divider__root
  };
  return <Divider classes={dividerClasses} />;
};

BrowseDivider.propTypes = propTypes;

export default withStyles(BrowseDividerStyles)(BrowseDivider);
