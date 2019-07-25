import { NotificationTypes } from "./../../../../utils/notifications";
import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const TypeResourceNotificationType = PropTypes.oneOf([
  NotificationTypes.RESOURCE_CREATED,
  NotificationTypes.RESOURCE_UPDATED,
  NotificationTypes.RESOURCE_DELETED
]);

const propTypes = {
  type: TypeResourceNotificationType.isRequired
};

const TurbotNotificationTitleForResource = ({ type }) => {
  switch (type) {
    case NotificationTypes.RESOURCE_CREATED:
      return <Fragment>&nbsp;Created by &#60;TBD&#62;</Fragment>;
    case NotificationTypes.RESOURCE_UPDATED:
      return <Fragment>&nbsp;Updated by &#60;TBD&#62;</Fragment>;
    case NotificationTypes.RESOURCE_DELETED:
      return <Fragment>&nbsp;Deleted by &#60;TBD&#62;</Fragment>;

    default:
      return null;
  }
};

TurbotNotificationTitleForResource.propTypes = propTypes;

export default TurbotNotificationTitleForResource;
