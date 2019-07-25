import { ListQueryContext } from "../../../hoc/withScopeFilterListQuery";
import React from "react";

const withListQueryContext = Component => props => {
  return (
    <ListQueryContext.Consumer>
      {value => {
        return <Component {...value} {...props} />;
      }}
    </ListQueryContext.Consumer>
  );
};

export default withListQueryContext;
