import { withTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotTimeFormat from "../../../turbotTimeFormat/TurbotTimeFormat";
import { logColor, LogType } from "./../../../../utils/logs";

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
  type: PropTypes.oneOf([...notificationTypes]),
  timestamp: PropTypes.any.isRequired
};

const TurbotLogsTime = ({ theme, type, timestamp }) => {
  const color = logColor(theme)[type];
  return (
    <TurbotTimeFormat
      style={{ color: color }}
      timestamp={timestamp}
      format="HH:mm:ss"
    />
  );
};

TurbotLogsTime.propTypes = propTypes;

export default withTheme()(TurbotLogsTime);
