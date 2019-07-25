import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TurbotProcessStepNoteStyles from "./TurbotProcessStepNote.styles";

const propTypes = {};

const TurbotProcessStepNote = ({ classes, children }) => {
  return <div className={classes.root}>{children}</div>;
};

TurbotProcessStepNote.propTypes = propTypes;

export default withStyles(TurbotProcessStepNoteStyles)(TurbotProcessStepNote);
