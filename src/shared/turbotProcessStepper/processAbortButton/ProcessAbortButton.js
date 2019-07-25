import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import ProcessAbortStyles from "./ProcessAbortButton.styles";

const propTypes = {
  onClick: PropTypes.func
};

const ProcessAbortButton = ({ classes, onClick }) => {
  return (
    <Typography classes={classes} onClick={onClick} variant={"caption"}>
      ABORT
    </Typography>
  );
};

ProcessAbortButton.propTypes = propTypes;

export default withStyles(ProcessAbortStyles)(ProcessAbortButton);
