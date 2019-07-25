import React from "react";
import TurbotAwsSignInLabel from "../shared/turbotLoginButtons/turbotAwsSignInButton/TurbotAwsSignInLabel";
import _ from "lodash";
import { getPermissionTitle } from "./permissions";

const shouldShowUserMode = (permissionsMode, loginLevelResource) => {
  // TODO when IAM user login is available, enable this logic again
  return false;
};

export const getLoginOptions = (
  activeGrants,
  permissionsMode,
  loginLevelResource,
  resource,
  showAccountId = false,
  showAwsLabel = false
) => {
  const showUserMode = shouldShowUserMode(permissionsMode, loginLevelResource);
  const loginOptions = [];
  const resourceId = resource.turbot.id;
  if (showUserMode) {
    loginOptions.push({
      type: "test",
      label: "test",
      value: `${resourceId}-test`
    });
  }
  const roleLogins = activeGrants.map(activeGrant => {
    const permissionType = activeGrant.grant.type;
    const permissionLevel = activeGrant.grant.level;
    const roleName = activeGrant.grant.roleName;
    return {
      permissionTypeAka: permissionType.uri,
      permissionLevelAka: permissionLevel.uri,
      roleName,
      type: "iamRole",
      label: (
        <TurbotAwsSignInLabel
          accountId={resource.Id}
          loginType="iamRole"
          permissionLevel={permissionLevel}
          permissionType={permissionType}
          roleName={roleName}
          showAccountId={showAccountId}
          showAwsLabel={showAwsLabel}
        />
      ),
      sort: getPermissionTitle(permissionType, permissionLevel, roleName),
      value: `${resourceId}-role-${permissionType.uri}-${permissionLevel.uri}${
        roleName ? `-${roleName}` : ""
      }`
    };
  });
  return loginOptions.concat(_.sortBy(roleLogins, l => l.sort));
};
