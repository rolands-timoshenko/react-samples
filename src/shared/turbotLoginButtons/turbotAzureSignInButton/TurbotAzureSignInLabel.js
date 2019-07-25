import React, { Fragment } from "react";
import TurbotIcon from "../../turbotIcon/TurbotIcon";

const TurbotAzureSignInLabel = ({ processing, subscriptionId }) => {
  if (processing) {
    return "Loading...";
  }
  return (
    <Fragment>
      <span>Azure&nbsp;&nbsp;</span>
      {subscriptionId && <span>@&nbsp;{subscriptionId}&nbsp;</span>}
      <TurbotIcon icon={["fas", "sign-out-alt"]} />
    </Fragment>
  );
};

export default TurbotAzureSignInLabel;
