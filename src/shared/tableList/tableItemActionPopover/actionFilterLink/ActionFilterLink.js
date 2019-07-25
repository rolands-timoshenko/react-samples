import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ResourceFilterLinkStyles from "./ActionFilterLink.styles";

const propTypes = {
  onClick: PropTypes.func
};

const ActionFilterLink = ({ classes, onClick, children }) => {
  return (
    <Typography classes={classes} onClick={onClick} variant="body1">
      {children}
    </Typography>
  );
};

ActionFilterLink.propTypes = propTypes;

export default withStyles(ResourceFilterLinkStyles)(ActionFilterLink);
