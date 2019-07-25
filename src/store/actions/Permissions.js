export const ACTIONS = {
  SET_PERMISSIONS_METADATA: "permissions_set_metadata",
  SET_USER_PERMISSIONS: "permissions_set_user_permissions",
  CLEAR_USER_PERMISSIONS: "permissions_clear_user_permissions"
};

export const clearUserPermissions = () => {
  return {
    type: ACTIONS.CLEAR_USER_PERMISSIONS
  };
};

export const setUserPermissions = userPermissions => {
  return {
    type: ACTIONS.SET_USER_PERMISSIONS,
    payload: userPermissions
  };
};

export const setPermissionsMetadata = permissionsMetadata => {
  return {
    type: ACTIONS.SET_PERMISSIONS_METADATA,
    payload: permissionsMetadata
  };
};
