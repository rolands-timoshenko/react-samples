import { createSelector } from "reselect";

/**
 * Select permissions metadata
 */
export const selectPermissionsMetadata = createSelector(
  state => state.permissions.metadata,
  metadata => metadata
);

/**
 * Select permission types
 */
export const selectPermissionTypes = createSelector(
  state => state.permissions.metadata,
  metadata => (metadata && metadata.types ? metadata.types : {})
);

/**
 * Select user permissions
 */
export const selectUserPermissions = createSelector(
  state => state.permissions.userPermissions,
  userPermissions => userPermissions
);
