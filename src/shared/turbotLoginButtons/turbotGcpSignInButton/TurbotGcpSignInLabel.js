import React, { Fragment } from "react";
import TurbotIcon from "../../turbotIcon/TurbotIcon";

const TurbotGcpSignInLabel = ({ processing, resource }) => {
  if (processing) {
    return "Loading...";
  }
  return (
    <Fragment>
      <span>GCP&nbsp;</span>
      {resource && <span>@&nbsp;{resource.projectId}&nbsp;</span>}
      <TurbotIcon icon={["fas", "sign-out-alt"]} />
    </Fragment>
  );
};

export default TurbotGcpSignInLabel;
