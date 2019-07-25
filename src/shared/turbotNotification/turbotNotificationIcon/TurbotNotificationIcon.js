import React from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotNotificationIconForControl from "./turbotNotificationIconForControl/TurbotNotificationIconForControl";
import { NotificationTypes } from "../../../utils/notifications";
import { resourceNotificationStates } from "./../../../utils/notifications";
import { withTheme } from "@material-ui/core";

const notificationTypes = [
  NotificationTypes.ACTION_NOTIFY,
  NotificationTypes.CONTROL_NOTIFY,
  NotificationTypes.POLICY_NOTIFY,
  NotificationTypes.CONTROL_CREATED,
  NotificationTypes.CONTROL_UPDATED,
  NotificationTypes.CONTROL_DELETED,
  NotificationTypes.RESOURCE_CREATED,
  NotificationTypes.RESOURCE_UPDATED,
  NotificationTypes.RESOURCE_DELETED,
  NotificationTypes.POLICY_SETTING_CREATED,
  NotificationTypes.POLICY_SETTING_DELETED,
  NotificationTypes.POLICY_SETTING_UPDATED,
  NotificationTypes.POLICY_VALUE_CREATED,
  NotificationTypes.POLICY_VALUE_UPDATED,
  NotificationTypes.POLICY_VALUE_DELETED
];

const propTypes = {
  type: PropTypes.oneOf([...notificationTypes])
};

const TurbotNotificationIcon = ({ theme, notification }) => {
  switch (notification.notificationType) {
    case NotificationTypes.ACTION_NOTIFY:
    case NotificationTypes.CONTROL_NOTIFY:
    case NotificationTypes.POLICY_NOTIFY:
      return <TurbotIcon icon={notification.icon} />;

    case NotificationTypes.CONTROL_CREATED:
    case NotificationTypes.CONTROL_UPDATED:
      return (
        <TurbotNotificationIconForControl state={notification.control.state} />
      );

    case NotificationTypes.CONTROL_DELETED:
      return (
        <TurbotNotificationIconForControl
          state={notification.oldControl.state}
        />
      );

    case NotificationTypes.RESOURCE_CREATED:
    case NotificationTypes.RESOURCE_UPDATED:
    case NotificationTypes.RESOURCE_DELETED:
      const state = resourceNotificationStates(theme)[
        notification.notificationType
      ];
      return <TurbotIcon icon={state.icon} style={{ color: state.color }} />;

    case NotificationTypes.POLICY_VALUE_CREATED:
    case NotificationTypes.POLICY_VALUE_UPDATED:
    case NotificationTypes.POLICY_VALUE_DELETED:
      const policyValueState = resourceNotificationStates(theme)[
        notification.notificationType
      ];
      return (
        <TurbotIcon
          icon={policyValueState.icon}
          style={{ color: policyValueState.color }}
        />
      );

    default:
      return null;
  }
};

TurbotNotificationIcon.propTypes = propTypes;

export default withTheme()(TurbotNotificationIcon);
