import React from "react";
import TurbotBackoff from "../shared/turbotBackoff/TurbotBackoff";

const withBackoff = (WrappedComponent, refreshInterval) => {
  return props => (
    <TurbotBackoff interval={refreshInterval}>
      <WrappedComponent {...props} />
    </TurbotBackoff>
  );
};

export default withBackoff;
