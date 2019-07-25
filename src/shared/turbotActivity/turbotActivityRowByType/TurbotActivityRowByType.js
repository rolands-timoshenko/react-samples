import React from "react";
import PropTypes from "prop-types";
import TurbotActivityControlRow from "../turbotActivityControlRow/TurbotActivityControlRow";
import TurbotActivityNotifyRow from "../turbotActivityNotifyRow/TurbotActivityNotifyRow";
import TurbotActivityPolicySettingRow from "../turbotActivityPolicySettingRow/TurbotActivityPolicySettingRow";
import TurbotActivityPolicyValueRow from "../turbotActivityPolicyValueRow/TurbotActivityPolicyValueRow";
import TurbotActivityResourceRow from "../turbotActivityResourceRow/TurbotActivityResourceRow";
import { NotificationTypes } from "./../../../utils/notifications";
import { TypeActivityViewType } from "../TurbotActivity.types";
import TurbotActivityGrantRow from "../turbotActivityGrantRow/TurbotActivityGrantRow";
import TurbotActivityActiveGrantRow from "../turbotActivityActiveGrantRow/TurbotActivityActiveGrantRow";

export const TypeNotifyNotificationType = PropTypes.oneOf([
  NotificationTypes.ACTION_NOTIFY,
  NotificationTypes.CONTROL_NOTIFY,
  NotificationTypes.POLICY_NOTIFY
]);

export const TypeResourceNotificationType = PropTypes.oneOf([
  NotificationTypes.RESOURCE_CREATED,
  NotificationTypes.RESOURCE_UPDATED,
  NotificationTypes.RESOURCE_DELETED
]);

export const TypeControlNotificationType = PropTypes.oneOf([
  NotificationTypes.CONTROL_CREATED,
  NotificationTypes.CONTROL_UPDATED,
  NotificationTypes.CONTROL_DELETED
]);

export const TypeGrantNotificationType = PropTypes.oneOf([
  NotificationTypes.GRANT_CREATED,
  NotificationTypes.GRANT_UPDATED,
  NotificationTypes.GRANT_DELETED
]);

export const TypeActiveGrantNotificationType = PropTypes.oneOf([
  NotificationTypes.ACTIVE_GRANT_CREATED,
  NotificationTypes.ACTIVE_GRANT_UPDATED,
  NotificationTypes.ACTIVE_GRANT_DELETED
]);

export const TypePolicySettingNotificationType = PropTypes.oneOf([
  NotificationTypes.POLICY_SETTING_CREATED,
  NotificationTypes.POLICY_SETTING_UPDATED,
  NotificationTypes.POLICY_SETTING_DELETED
]);

export const TypePolicyValueNotificationType = PropTypes.oneOf([
  NotificationTypes.POLICY_VALUE_CREATED,
  NotificationTypes.POLICY_VALUE_UPDATED,
  NotificationTypes.POLICY_VALUE_DELETED
]);

const propTypes = {
  activity: PropTypes.object.isRequired,
  viewType: TypeActivityViewType.isRequired,
  type: PropTypes.oneOfType([
    TypeNotifyNotificationType,
    TypeResourceNotificationType,
    TypeControlNotificationType,
    TypeGrantNotificationType,
    TypeActiveGrantNotificationType,
    TypePolicySettingNotificationType,
    TypePolicyValueNotificationType
  ])
};

const TurbotActivityRowByType = ({ type, activity, viewType }) => {
  switch (type) {
    case NotificationTypes.GRANT_CREATED:
    case NotificationTypes.GRANT_DELETED:
    case NotificationTypes.GRANT_UPDATED:
      return <TurbotActivityGrantRow viewType={viewType} activity={activity} />;

    case NotificationTypes.ACTIVE_GRANT_CREATED:
    case NotificationTypes.ACTIVE_GRANT_DELETED:
      return (
        <TurbotActivityActiveGrantRow viewType={viewType} activity={activity} />
      );

    case NotificationTypes.ACTION_NOTIFY:
    case NotificationTypes.CONTROL_NOTIFY:
    case NotificationTypes.POLICY_NOTIFY:
      return (
        <TurbotActivityNotifyRow viewType={viewType} activity={activity} />
      );

    case NotificationTypes.CONTROL_CREATED:
    case NotificationTypes.CONTROL_UPDATED:
    case NotificationTypes.CONTROL_DELETED:
      return (
        <TurbotActivityControlRow viewType={viewType} activity={activity} />
      );

    case NotificationTypes.RESOURCE_CREATED:
    case NotificationTypes.RESOURCE_UPDATED:
    case NotificationTypes.RESOURCE_DELETED:
      return (
        <TurbotActivityResourceRow viewType={viewType} activity={activity} />
      );

    case NotificationTypes.POLICY_SETTING_CREATED:
    case NotificationTypes.POLICY_SETTING_UPDATED:
    case NotificationTypes.POLICY_SETTING_DELETED:
      return (
        <TurbotActivityPolicySettingRow
          viewType={viewType}
          activity={activity}
        />
      );

    case NotificationTypes.POLICY_VALUE_CREATED:
    case NotificationTypes.POLICY_VALUE_UPDATED:
    case NotificationTypes.POLICY_VALUE_DELETED:
      return (
        <TurbotActivityPolicyValueRow viewType={viewType} activity={activity} />
      );

    default:
      return null;
  }
};

TurbotActivityRowByType.propTypes = propTypes;

export default TurbotActivityRowByType;
