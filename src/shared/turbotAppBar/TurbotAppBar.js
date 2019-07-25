import { withStyles } from "@material-ui/core/styles";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import TurbotAppBarStyles from "./TurbotAppBar.styles";

const propTypes = {};

const TurbotAppBar = props => {
  return <AppBar {...props}>{props.children}</AppBar>;
};

TurbotAppBar.propTypes = propTypes;

export default withStyles(TurbotAppBarStyles)(TurbotAppBar);
