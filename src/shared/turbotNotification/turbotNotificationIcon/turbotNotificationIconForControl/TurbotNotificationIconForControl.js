import { colours, ControlStates } from "./../../../../utils/controls";
import React from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import { icon } from "../../../../utils/controls";
import { withTheme } from "@material-ui/core";

const propTypes = {
  state: PropTypes.oneOf([
    ControlStates.ALARM,
    ControlStates.ERROR,
    ControlStates.INSUFFICIENT,
    ControlStates.OK,
    ControlStates.TBD,
    ControlStates.SKIPPED,
    ControlStates.INVALID
  ])
};

const TurbotNotificationIconForControl = ({ theme, state }) => {
  return (
    <TurbotIcon
      icon={icon(state)}
      style={{ color: colours(state, theme).icon }}
    />
  );
};

TurbotNotificationIconForControl.propTypes = propTypes;

export default withTheme()(TurbotNotificationIconForControl);
