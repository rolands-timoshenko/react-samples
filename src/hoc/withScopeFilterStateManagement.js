import React from "react";
import TurbotScopeFilterStateManagement from "../shared/turbotScopeFilterStateManagement/TurbotScopeFilterStateManagement";

export const withScopeFilterStateManagement = WrappedComponent => props => (
  <TurbotScopeFilterStateManagement>
    <WrappedComponent {...props} />
  </TurbotScopeFilterStateManagement>
);
