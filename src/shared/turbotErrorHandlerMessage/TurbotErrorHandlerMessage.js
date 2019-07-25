import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import TurbotErrorHandlerMessageStyles from "./TurbotErrorHandlerMessage.styles";

const propTypes = {
  onReset: PropTypes.func
};

const TurbotErrorHandlerMessage = ({ classes, onReset }) => {
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">
        Something went wrong!
        {onReset && (
          <>
            &nbsp;<span onClick={onReset}>Reload.</span>
          </>
        )}
      </Typography>
    </div>
  );
};

TurbotErrorHandlerMessage.propTypes = propTypes;

export default withStyles(TurbotErrorHandlerMessageStyles)(
  TurbotErrorHandlerMessage
);
