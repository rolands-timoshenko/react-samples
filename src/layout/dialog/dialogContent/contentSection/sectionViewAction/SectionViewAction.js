import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";
import SectionViewActionStyles from "./SectionViewAction.styles";

const propTypes = {
  linkTitle: PropTypes.string.isRequired,
  gutterBottom: PropTypes.bool
};

const SectionViewAction = ({
  classes,
  linkTitle,
  gutterBottom = false,
  handler
}) => {
  return (
    <Typography classes={classes} variant="caption" onClick={handler}>
      {linkTitle && linkTitle.toUpperCase()}
    </Typography>
  );
};

SectionViewAction.propTypes = propTypes;

export default withStyles(SectionViewActionStyles)(SectionViewAction);
