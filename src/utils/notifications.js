export const NotificationTypes = Object.freeze({
  ACTION_NOTIFY: "action_notify",
  CONTROL_NOTIFY: "control_notify",
  POLICY_NOTIFY: "policy_notify",
  CONTROL_CREATED: "control_created",
  CONTROL_UPDATED: "control_updated",
  CONTROL_DELETED: "control_deleted",
  GRANT_CREATED: "grant_created",
  GRANT_UPDATED: "grant_updated",
  GRANT_DELETED: "grant_deleted",
  ACTIVE_GRANT_CREATED: "active_grants_created",
  ACTIVE_GRANT_UPDATED: "active_grants_updated",
  ACTIVE_GRANT_DELETED: "active_grants_deleted",
  RESOURCE_CREATED: "resource_created",
  RESOURCE_UPDATED: "resource_updated",
  RESOURCE_DELETED: "resource_deleted",
  POLICY_SETTING_CREATED: "policy_setting_created",
  POLICY_SETTING_UPDATED: "policy_setting_updated",
  POLICY_SETTING_DELETED: "policy_setting_deleted",
  POLICY_VALUE_CREATED: "policy_value_created",
  POLICY_VALUE_UPDATED: "policy_value_updated",
  POLICY_VALUE_DELETED: "policy_value_deleted"
});

export const resourceNotificationStates = theme => ({
  [NotificationTypes.RESOURCE_CREATED]: {
    icon: ["fas", "plus-square"],
    color: theme.palette.green
  },
  [NotificationTypes.RESOURCE_UPDATED]: {
    icon: ["fas", "arrow-square-up"],
    color: theme.palette.notification.updated
  },
  [NotificationTypes.RESOURCE_DELETED]: {
    icon: ["fas", "minus-square"],
    color: theme.palette.notification.deleted
  },
  [NotificationTypes.POLICY_VALUE_CREATED]: {
    icon: ["far", "sliders-h-square"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.POLICY_VALUE_UPDATED]: {
    icon: ["far", "sliders-h-square"],
    color: theme.palette.notification.updated
  },
  [NotificationTypes.POLICY_VALUE_DELETED]: {
    icon: ["far", "sliders-h-square"],
    color: theme.palette.notification.deleted
  }
});
