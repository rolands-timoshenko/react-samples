import React from "react";
import TurbotQueryFilterConvertor from "../shared/turbotQueryFilterConvertor/TurbotQueryFilterConvertor";

export const withLocalFilterAddedIntoQuery = key => WrappedComponent => {
  return props => {
    return (
      <TurbotQueryFilterConvertor filterSearchKey={key} {...props}>
        {props => <WrappedComponent {...props} />}
      </TurbotQueryFilterConvertor>
    );
  };
};
