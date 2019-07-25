import React from "react";
import PropTypes from "prop-types";
import TurbotSectionHeaderStyles from "./TurbotSectionHeader.styles";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const propTypes = {
  title: PropTypes.string.isRequired,
  gutterBottom: PropTypes.bool,
  gutterTop: PropTypes.bool
};

const rootClassName = (classes, gutterTop, gutterBottom) => {
  const classesArr = [classes.root];
  gutterTop && classesArr.push(classes.gutterTop);
  gutterBottom && classesArr.push(classes.gutterBottom);
  return classesArr.join(" ");
};

const TurbotSectionHeader = ({
  classes,
  title,
  style,
  gutterTop = false,
  gutterBottom = false
}) => {
  return (
    <Typography
      classes={{
        root: rootClassName(classes, gutterTop, gutterBottom)
      }}
      style={style}
      variant="subtitle1"
    >
      {title}
    </Typography>
  );
};

TurbotSectionHeader.propTypes = propTypes;

export default withStyles(TurbotSectionHeaderStyles)(TurbotSectionHeader);
