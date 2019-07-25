import PropTypes from "prop-types";
import DialogHeaderStyles from "./DialogHeader.styles";
import DialogClose from "../dialogClose/DialogClose";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const propTypes = {
  contextTitle: PropTypes.string
};

const DialogHeader = ({ children, classes, contextTitle, history }) => {
  return (
    <div className={classes.root}>
      <div className={classes.leftContext}>{children}</div>
      <div className={classes.rightContext}>
        <Typography variant="body1">{contextTitle}</Typography>
        <DialogClose onClick={() => history.goBack()} />
      </div>
    </div>
  );
};

DialogHeader.propTypes = propTypes;

export default withRouter(withStyles(DialogHeaderStyles)(DialogHeader));
