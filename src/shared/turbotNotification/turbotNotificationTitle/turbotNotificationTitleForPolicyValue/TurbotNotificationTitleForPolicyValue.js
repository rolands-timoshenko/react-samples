import React from "react";
import PropTypes from "prop-types";
import { getTitle } from "../../../../utils/resources";
import { NotificationTypes } from "../../../../utils/notifications";

export const TypePolicyValueNotificationType = PropTypes.oneOf([
  NotificationTypes.POLICY_VALUE_CREATED,
  NotificationTypes.POLICY_VALUE_UPDATED,
  NotificationTypes.POLICY_VALUE_DELETED
]);

const propTypes = {
  type: TypePolicyValueNotificationType.isRequired
};

const createPath = items => {
  let path = "";
  items.forEach(item => (path += `${getTitle(item)} > `));
  path = path.slice(0, -2);
  return path;
};

const TurbotNotificationTitleForPolicyValue = ({ type, path }) => {
  const policyTitle = createPath(path);
  switch (type) {
    case NotificationTypes.POLICY_VALUE_CREATED:
      return (
        <>
          Policy Value Created &nbsp;&nbsp;&nbsp;<sub>{policyTitle}</sub>
        </>
      );
    case NotificationTypes.POLICY_VALUE_UPDATED:
      return (
        <>
          Policy Value Updated &nbsp;&nbsp;&nbsp;
          <sub>{policyTitle}</sub>
        </>
      );
    case NotificationTypes.POLICY_VALUE_DELETED:
      return (
        <>
          Policy Value Deleted &nbsp;&nbsp;&nbsp;
          <sub>{policyTitle}</sub>
        </>
      );

    default:
      return null;
  }
};

TurbotNotificationTitleForPolicyValue.propTypes = propTypes;

export default TurbotNotificationTitleForPolicyValue;
