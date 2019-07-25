import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../../../../../shared/turbotIcon/TurbotIcon";
import SectionHeaderStyles from "./SectionHeader.styles";

const propTypes = {
  title: PropTypes.string.isRequired,
  gutterBottom: PropTypes.bool
};

const SectionHeader = ({ classes, title, gutterBottom = false }) => {
  const transformedTitle = title.toLocaleUpperCase();
  return (
    <Typography
      classes={classes}
      color="textSecondary"
      variant="caption"
      gutterBottom={gutterBottom}
    >
      {transformedTitle}
      &nbsp; <TurbotIcon icon={["fal", "info-circle"]} />
    </Typography>
  );
};

SectionHeader.propTypes = propTypes;

export default withStyles(SectionHeaderStyles)(SectionHeader);
