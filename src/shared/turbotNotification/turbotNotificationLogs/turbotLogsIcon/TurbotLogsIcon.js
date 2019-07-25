import { withTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import { logColor, logIcon, LogType } from "./../../../../utils/logs";

const notificationTypes = [
  LogType.EMERGENCY,
  LogType.ALERT,
  LogType.CRITICAL,
  LogType.ERROR,
  LogType.WARNING,
  LogType.NOTICE,
  LogType.INFO,
  LogType.DEBUG
];

const propTypes = {
  type: PropTypes.oneOf([...notificationTypes])
};

const TurbotLogsIcon = ({ theme, type }) => {
  const color = logColor(theme)[type];
  const icon = logIcon[type];
  return <TurbotIcon icon={icon} style={{ color: color }} />;
};

TurbotLogsIcon.propTypes = propTypes;

export default withTheme()(TurbotLogsIcon);
