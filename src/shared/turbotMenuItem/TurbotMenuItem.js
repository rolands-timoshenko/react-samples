import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import TurbotMenuItemStyles from "./TurbotMenuItem.styles";

const propTypes = {};

const TurbotMenuItem = props => {
  return <MenuItem {...props}>{props.children}</MenuItem>;
};

TurbotMenuItem.propTypes = propTypes;

export default withStyles(TurbotMenuItemStyles)(TurbotMenuItem);
