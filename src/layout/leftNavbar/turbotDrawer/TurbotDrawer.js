import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import TurbotDrawerStyles from "./TurbotDrawer.styles";
import TurbotAppBarLogo from "../../turbotAppBar/TurbotAppBar";

const propTypes = {
  width: PropTypes.number,
  toolbar: PropTypes.any,
  onMouseDown: PropTypes.func
};

const TurbotDrawer = ({
  classes,
  width,
  onMouseDown,
  children,
  draggable = false
}) => {
  const DrawerClasses = {
    docked: classes.docked,
    paper: classes.paper,
    paperAnchorDockedLeft: classes.paperAnchorDockedLeft
  };

  const PaperStyle = {
    width: width
  };

  return (
    <Drawer
      PaperProps={{ style: PaperStyle }}
      classes={DrawerClasses}
      variant="permanent"
      //open
    >
      <div className={classes.content}>{children}</div>
      {draggable && (
        <div className={classes.dragger} onMouseDown={onMouseDown} />
      )}
    </Drawer>
  );
};

TurbotDrawer.propTypes = propTypes;

export default withStyles(TurbotDrawerStyles)(TurbotDrawer);
