import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import TurbotNotificationTitleForControlStyles from "./TurbotNotificationTitleForControl.styles";
import { compose } from "react-apollo";
import { label } from "./../../../../utils/controls";
import { NotificationTypes } from "./../../../../utils/notifications";
import { withStyles, withTheme } from "@material-ui/core";

export const TypeControlNotificationType = PropTypes.oneOf([
  NotificationTypes.CONTROL_CREATED,
  NotificationTypes.CONTROL_UPDATED,
  NotificationTypes.CONTROL_DELETED
]);

const propTypes = {
  type: TypeControlNotificationType.isRequired,
  state: PropTypes.string.isRequired,
  oldState: PropTypes.string,
  reason: PropTypes.string,
  controlType: PropTypes.string
};

const TurbotNotificationTitleForControl = ({
  theme,
  type,
  state,
  oldState,
  reason,
  controlType
}) => {
  switch (type) {
    case NotificationTypes.CONTROL_CREATED:
      return (
        <Fragment>
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {label(state)}
          </span>
          {reason && (
            <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
              :&nbsp;{reason}
            </span>
          )}
          &nbsp;for{" "}
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {controlType}
          </span>
        </Fragment>
      );
    case NotificationTypes.CONTROL_UPDATED:
      return (
        <Fragment>
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {label(oldState)}&nbsp;
          </span>
          <TurbotIcon icon={["far", "long-arrow-right"]} />
          &nbsp;
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {label(state)}
          </span>
          {reason && (
            <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
              :&nbsp;{reason}
            </span>
          )}
          &nbsp;for{" "}
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {controlType}
          </span>
        </Fragment>
      );
    case NotificationTypes.CONTROL_DELETED:
      return (
        <Fragment>
          <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
            {label(oldState)}
          </span>
          &nbsp;
          <TurbotIcon icon={["far", "long-arrow-right"]} />
          &nbsp;DELETED
        </Fragment>
      );

    default:
      return null;
  }
};

TurbotNotificationTitleForControl.propTypes = propTypes;

const enhance = compose(
  withTheme(),
  withStyles(TurbotNotificationTitleForControlStyles)
);

export default enhance(TurbotNotificationTitleForControl);
