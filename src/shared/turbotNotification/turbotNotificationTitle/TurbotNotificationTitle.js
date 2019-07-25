import PropTypes from "prop-types";
import React from "react";
import { NotificationTypes } from "./../../../utils/notifications";
import TurbotNotificationTitleForControl, {
  TypeControlNotificationType
} from "./turbotNotificationTitleForControl/TurbotNotificationTitleForControl";
import TurbotNotificationTitleForPolicySetting, {
  TypePolicySettingNotificationType
} from "./turbotNotificationTitleForPolicySetting/TurbotNotificationTitleForPolicySetting";
import TurbotNotificationTitleForPolicyValue, {
  TypePolicyValueNotificationType
} from "./turbotNotificationTitleForPolicyValue/TurbotNotificationTitleForPolicyValue";
import TurbotNotificationTitleForResource, {
  TypeResourceNotificationType
} from "./turbotNotificationTitleForResource/TurbotNotificationTitleForResource";

const TypeNotification = PropTypes.shape({
  notificationType: PropTypes.oneOfType([
    TypeResourceNotificationType,
    TypeControlNotificationType,
    TypePolicySettingNotificationType,
    TypePolicyValueNotificationType
  ]),
  oldControl: PropTypes.object,
  control: PropTypes.object,
  path: PropTypes.object
});

const propTypes = {
  notification: TypeNotification.isRequired
};

const TurbotNotificationTitle = ({ notification }) => {
  switch (notification.notificationType) {
    case NotificationTypes.CONTROL_CREATED:
    case NotificationTypes.CONTROL_UPDATED:
    case NotificationTypes.CONTROL_DELETED:
      return (
        <TurbotNotificationTitleForControl
          state={notification.control && notification.control.state}
          oldState={notification.oldControl && notification.oldControl.state}
          type={notification.notificationType}
        />
      );

    case NotificationTypes.RESOURCE_CREATED:
    case NotificationTypes.RESOURCE_UPDATED:
    case NotificationTypes.RESOURCE_DELETED:
      return (
        <TurbotNotificationTitleForResource
          type={notification.notificationType}
        />
      );

    case NotificationTypes.POLICY_SETTING_CREATED:
    case NotificationTypes.POLICY_SETTING_UPDATED:
    case NotificationTypes.POLICY_SETTING_DELETED:
      return (
        <TurbotNotificationTitleForPolicySetting
          type={notification.notificationType}
        />
      );

    case NotificationTypes.POLICY_VALUE_CREATED:
    case NotificationTypes.POLICY_VALUE_UPDATED:
    case NotificationTypes.POLICY_VALUE_DELETED:
      return (
        <TurbotNotificationTitleForPolicyValue
          type={notification.notificationType}
          path={notification.policyValue.setting.type.trunk.items}
        />
      );

    default:
      return (
        <span>type {notification.notificationType} is not defined yet</span>
      );
  }
};

TurbotNotificationTitle.propTypes = propTypes;

export default TurbotNotificationTitle;
