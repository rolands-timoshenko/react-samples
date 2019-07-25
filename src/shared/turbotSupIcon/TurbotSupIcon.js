import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotSupIconStyles from "./TurbotSupIcon.styles";

const propTypes = {
  icon: PropTypes.array.isRequired
};

const TurbotSupIcon = ({ classes, children, icon }) => {
  return (
    <span className={classes.root}>
      {children}
      <sup className={classes.sup}>
        <TurbotIcon classes={{ root: classes.TurbotIcon_root }} icon={icon} />
      </sup>
    </span>
  );
};

TurbotSupIcon.propTypes = propTypes;

export default withStyles(TurbotSupIconStyles)(TurbotSupIcon);
