import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import TurbotLogsData from "../turbotLogsData/TurbotLogsData";
import { logColor, LogType } from "./../../../../utils/logs";
import { withTheme } from "@material-ui/core";

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
  message: PropTypes.string.isRequired,
  data: PropTypes.object
};

const TurbotLogsMessage = ({
  theme,
  type,
  message,
  data,
  dataOpen,
  onToggleDataVisible
}) => {
  const color = logColor(theme)[type];
  const hasData = data && Object.keys(data).length > 0;
  const isString = typeof message === "string" || message instanceof String;

  return (
    <Fragment>
      <span
        style={{ color: color, cursor: hasData ? "pointer" : "normal" }}
        onClick={() => (hasData ? onToggleDataVisible() : null)}
      >
        {isString && <span dangerouslySetInnerHTML={{ __html: message }} />}
        {!isString && message}
        {hasData && (
          <TurbotIcon icon={["fal", dataOpen ? "angle-up" : "angle-down"]} />
        )}
      </span>

      {hasData && dataOpen && <TurbotLogsData data={data} />}
    </Fragment>
  );
};

TurbotLogsMessage.propTypes = propTypes;

export default withTheme()(TurbotLogsMessage);
