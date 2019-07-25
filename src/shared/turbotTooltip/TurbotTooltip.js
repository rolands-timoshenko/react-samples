import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import TurbotTooltipStyles from "./TurbotTooltip.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  placement: PropTypes.oneOf(["top", "bottom", "top-start", "bottom-start"]),
  enterDelay: PropTypes.number
};

const TurbotTooltip = ({
  children,
  classes,
  style,
  title,
  placement,
  enterDelay = 0
}) => {
  return (
    <Tooltip
      placement={placement}
      classes={classes}
      title={title}
      style={style}
      enterDelay={enterDelay}
    >
      {children}
    </Tooltip>
  );
};

TurbotTooltip.propTypes = propTypes;

export default withStyles(TurbotTooltipStyles)(TurbotTooltip);
