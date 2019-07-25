import { withStyles } from "@material-ui/core/styles";
import React from "react";
import DrawerItemTextStyles from "./DrawerItemText.styles";
import ListItemText from "@material-ui/core/ListItemText";

const propTypes = {};

const DrawerItemText = ({ classes, children }) => {
  return <ListItemText classes={classes} primary={children} />;
};

DrawerItemText.propTypes = propTypes;

export default withStyles(DrawerItemTextStyles)(DrawerItemText);
