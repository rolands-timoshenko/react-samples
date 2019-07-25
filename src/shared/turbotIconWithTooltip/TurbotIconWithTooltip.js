import React from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import Tooltip from "@material-ui/core/Tooltip";
import TurbotIconWithTooltipStyles from "./TurbotIconWithTooltip.styles";
import { withStyles } from "@material-ui/core";

const propTypes = {
  title: PropTypes.string.isRequired
};

const TurbotIconWithTooltip = props => {
  const { title, classes, ...rest } = props;
  return (
    <Tooltip classes={{ tooltip: classes.tooltip }} title={title}>
      <span>
        <TurbotIcon {...rest} />
      </span>
    </Tooltip>
  );
};

TurbotIconWithTooltip.propTypes = propTypes;

export default withStyles(TurbotIconWithTooltipStyles)(TurbotIconWithTooltip);
