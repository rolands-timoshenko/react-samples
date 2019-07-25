import React, { Fragment } from "react";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import { getPermissionTitle } from "../../../utils/permissions";

const TurbotAwsSignInLabel = ({
  accountId,
  loginType,
  permissionLevel,
  permissionType,
  roleName,
  showAwsLabel,
  showAccountId
}) => {
  return (
    <Fragment>
      {showAwsLabel && <span>AWS&nbsp;&nbsp;@&nbsp;</span>}
      {showAccountId && <span>{accountId}&nbsp;</span>}
      {loginType === "iamRole" && (
        <span>
          {getPermissionTitle(permissionType, permissionLevel, roleName)}
          &nbsp;
        </span>
      )}
      {loginType === "iamUser" && "IAM User "}
      <TurbotIcon icon={["fas", "sign-out-alt"]} />
    </Fragment>
  );
};

export default TurbotAwsSignInLabel;
