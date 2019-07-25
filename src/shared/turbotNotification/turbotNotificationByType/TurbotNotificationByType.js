import React from "react";
import PropTypes from "prop-types";
import { TypePolicyValueNotificationType } from "./../turbotNotificationTitle/turbotNotificationTitleForPolicyValue/TurbotNotificationTitleForPolicyValue";
import { TypePolicySettingNotificationType } from "./../turbotNotificationTitle/turbotNotificationTitleForPolicySetting/TurbotNotificationTitleForPolicySetting";
import TurbotPolicyNotificationContainer from "../turbotPolicyNotification/TurbotPolicyNotificationContainer";
import TurbotControlNotificationContainer from "../turbotControlNotification/TurbotControlNotificationContainer";
import TurbotResourceNotificationContainer from "../turbotResourceNotification/TurbotResourceNotificationContainer";
import { NotificationTypes } from "./../../../utils/notifications";
import { TypeControlNotificationType } from "./../turbotNotificationTitle/turbotNotificationTitleForControl/TurbotNotificationTitleForControl";
import { TypeResourceNotificationType } from "./../turbotNotificationTitle/turbotNotificationTitleForResource/TurbotNotificationTitleForResource";

const propTypes = {
  notification: PropTypes.object.isRequired,
  type: PropTypes.oneOfType([
    TypeResourceNotificationType,
    TypeControlNotificationType,
    TypePolicySettingNotificationType,
    TypePolicyValueNotificationType
  ])
};

const TurbotNotificationByType = ({ type, notification }) => {
  switch (type) {
    case NotificationTypes.CONTROL_CREATED:
    case NotificationTypes.CONTROL_UPDATED:
    case NotificationTypes.CONTROL_DELETED:
      return <TurbotControlNotificationContainer notification={notification} />;

    case NotificationTypes.RESOURCE_CREATED:
    case NotificationTypes.RESOURCE_UPDATED:
    case NotificationTypes.RESOURCE_DELETED:
      return (
        <TurbotResourceNotificationContainer notification={notification} />
      );

    case NotificationTypes.POLICY_VALUE_CREATED:
    case NotificationTypes.POLICY_VALUE_UPDATED:
    case NotificationTypes.POLICY_VALUE_DELETED:
      return <TurbotPolicyNotificationContainer notification={notification} />;

    default:
      return <p style={{ padding: 10 }}>&nbsp;</p>;
  }
};

TurbotNotificationByType.propTypes = propTypes;

export default TurbotNotificationByType;
