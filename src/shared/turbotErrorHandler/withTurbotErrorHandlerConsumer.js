import { TurbotErrorContext } from "./TurbotErrorHandlerProvider";
import React from "react";

const withTurbotErrorHandlerConsumer = WrappedComponent => {
  return props => (
    <TurbotErrorContext.Consumer>
      {({ error, info, setError, getErrorMessages }) => {
        return (
          <WrappedComponent
            errorHandler={{ error, info, setError, getErrorMessages }}
            {...props}
          />
        );
      }}
    </TurbotErrorContext.Consumer>
  );
};

export default withTurbotErrorHandlerConsumer;
