import { getBreadcrumbString, getTitle } from "./resources";

export const cloudLoginResourceTypes = {
  AwsAccount: "",
  AzureSubscription: "",
  GcpProject: ""
};

export const cloudLoginPermissionTypes = {
  Aws: "",
  Azure: "",
  Gcp: ""
};

export const getPermissionTitle = (type, level, roleName) => {
  const typeBreadcrumb = getBreadcrumbString(type.trunk, "/");
  const permissionTitleText = roleName
    ? getTitle(level) + "/" + roleName.split("/").pop()
    : getTitle(level);

  return `${typeBreadcrumb}/${permissionTitleText}`;
};

const isResourceInScope = (requiredResourcePath, grantResourcePath) => {
  if (!requiredResourcePath) {
    return false;
  }
  return requiredResourcePath.startsWith(grantResourcePath);
};

const isTypeInScope = (
  requiredPermissionTypeUri,
  permissionsMetadata,
  grantTypePath
) => {
  //TODO for now all we really do is ask if they have any
  //permissions for a type at this level or below. This model
  //isn't extensible, but we'll accept that for now
  const requiredPermissionType =
    permissionsMetadata.types[requiredPermissionTypeUri];
  // If we don't know about this type, always return false

  if (!requiredPermissionType) {
    return false;
  }

  return grantTypePath.startsWith(requiredPermissionType.turbot.path);
};

const isLevelInScope = (
  requiredPermissionLevelUri,
  permissionsMetadata,
  grantLevelPath
) => {
  const requiredPermissionLevel =
    permissionsMetadata.levels[requiredPermissionLevelUri];
  // If we don't know about this level, always return false

  if (!requiredPermissionLevel) {
    return false;
  }

  return grantLevelPath.startsWith(requiredPermissionLevel.turbot.path);
};

export const hasBreadcrumbPermission = (
  breadcrumbType,
  item,
  permissionsMetadata,
  userPermissions
) => {
  // This is complex, but here goes....if you are able to see a control/policy/resource category/type
  // then that implies you have permissions to either a resource instance of that category/type, or some descendant
  // of that category/type. So we should then allow you to navigate up the category/type hierarchy.
  // If it is a resource breadcrumb, then we can do a permissions check to determine whether
  // or not you can navigate to it
  if (breadcrumbType !== "resource") {
    return true;
  }
  return hasPermission(
    item.turbot.path,
    "",
    "",
    permissionsMetadata,
    userPermissions
  );
};

export const hasPermission = (
  resourcePath,
  permissionTypeUri,
  permissionLevelUri,
  permissionsMetadata,
  userPermissions
) => {
  // If there's no permissions metadata, then always return false
  if (!permissionsMetadata) {
    return false;
  }

  // If the user has no permissions, then always return false
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  // Steps
  // 1) Does the user have a grant at the resource level or above
  // 2) Does the user have a required permission type
  // 3) Does the user have a required permission level

  const grantsInScope = userPermissions.filter(userPermission => {
    const resourceInScope = isResourceInScope(
      resourcePath,
      userPermission.resource.turbot.path
    );
    const typeInScope = isTypeInScope(
      permissionTypeUri,
      permissionsMetadata,
      userPermission.grant.type.turbot.path
    );
    const levelInScope = isLevelInScope(
      permissionLevelUri,
      permissionsMetadata,
      userPermission.grant.level.turbot.path
    );
    return resourceInScope && typeInScope && levelInScope;
  });

  return grantsInScope.length > 0;
};

/*

           U.1
          /  \
         M.2 SU.7
         /  \
       RO.3 OW.6
        |
       OP.4
        |
       A.5

Does granted level start with required level?

AD: 1.2.3.4.5
ME: 1.2

ME: 1.2
AD: 1.2.3.4.5

RO: 1.2.3
AD:  1.2.3.4.5

OP: 1.2.3.4
AD:  1.2.3.4.5

AD: 1.2.3.4.5
AD: 1.2.3.4.5

OW: 1.2.6
ME: 1.2

ME: 1.2
OW: 1.2.6

RO: 1.2.3
OW: 1.2.6

*/
