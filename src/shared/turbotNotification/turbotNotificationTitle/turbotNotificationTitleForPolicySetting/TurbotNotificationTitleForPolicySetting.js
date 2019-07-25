import { NotificationTypes } from "../../../../utils/notifications";
import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const TypePolicySettingNotificationType = PropTypes.oneOf([
  NotificationTypes.POLICY_SETTING_CREATED,
  NotificationTypes.POLICY_SETTING_UPDATED,
  NotificationTypes.POLICY_SETTING_DELETED
]);

const propTypes = {
  type: TypePolicySettingNotificationType.isRequired
};

const TurbotNotificationTitleForPolicySetting = ({ type }) => {
  switch (type) {
    case NotificationTypes.POLICY_SETTING_CREATED:
      return <Fragment>Policy Setting Created</Fragment>;
    case NotificationTypes.POLICY_SETTING_UPDATED:
      return <Fragment>Policy Setting Updated</Fragment>;
    case NotificationTypes.POLICY_SETTING_DELETED:
      return <Fragment>Policy Setting Deleted</Fragment>;

    default:
      return null;
  }
};

TurbotNotificationTitleForPolicySetting.propTypes = propTypes;

export default TurbotNotificationTitleForPolicySetting;
