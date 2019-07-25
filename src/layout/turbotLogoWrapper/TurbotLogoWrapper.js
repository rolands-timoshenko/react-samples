import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import React from "react";
import TurbotLogo from "../leftNavbar/turbotLogo/TurbotLogo";
import TurbotTasksContainer from "../leftNavbar/turbotTasks/TurbotTasksContainer";
import TurbotLogoWrapperStyles from "./TurbotLogoWrapper.styles";

const propTypes = {
  // Fixed allow to fix width
  fixed: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const TurbotLogoWrapper = ({ classes, fixed }) => {
  const style = {
    ...(fixed && { width: fixed })
  };
  return (
    <div style={style} className={classes.root}>
      <TurbotLogo />
      {/*<TurbotTasksContainer />*/}
    </div>
  );
};

TurbotLogoWrapper.propTypes = propTypes;

export default withStyles(TurbotLogoWrapperStyles)(TurbotLogoWrapper);
