import { withStyles } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TurbotListItemIcon from "../../../../shared/turbotListItemIcon/TurbotListItemIcon";
import DrawerItemIconStyles from "./DrawerItemIcon.styles";

const TypeIcon = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

const propTypes = {
  icon: TypeIcon,
  style: PropTypes.object
};

const DrawerItemIcon = ({ classes, icon, style }) => {
  return (
    icon && <TurbotListItemIcon icon={icon} style={style} classes={classes} />
  );
};

DrawerItemIcon.propTypes = propTypes;

export default withStyles(DrawerItemIconStyles)(DrawerItemIcon);
