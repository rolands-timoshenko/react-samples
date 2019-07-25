import React from "react";
import PropTypes from "prop-types";
import TurbotLoader from "../turbotLoader/TurbotLoader";
import { withStyles } from "@material-ui/core";
import TurbotLoaderCurtainStyles from "./TurbotLoaderCurtain.styles";

const propTypes = {};

const TurbotLoaderCurtain = ({ classes }) => {
  return (
    <div className={classes.root}>
      <TurbotLoader />
    </div>
  );
};

TurbotLoaderCurtain.propTypes = propTypes;

export default withStyles(TurbotLoaderCurtainStyles)(TurbotLoaderCurtain);
