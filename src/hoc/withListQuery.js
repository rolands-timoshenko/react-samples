import React from "react";
import TurbotListQuery from "../shared/turbotListQuery/TurbotListQuery";
import TurbotBackoff from "../shared/turbotBackoff/TurbotBackoff";

const withListQuery = (
  key,
  graphqlQuery,
  refreshInterval
) => WrappedComponent => {
  return props => (
    <TurbotBackoff interval={refreshInterval}>
      <TurbotListQuery dataFetchKey={key} query={graphqlQuery}>
        <WrappedComponent {...props} />
      </TurbotListQuery>
    </TurbotBackoff>
  );
};

export default withListQuery;
