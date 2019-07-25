import React from "react";
import TurbotErrorHandlerProvider from "./TurbotErrorHandlerProvider";

const withTurbotErrorHandlerProvider = ErrorViewComponent => WrappedComponent => {
  return props => (
    <TurbotErrorHandlerProvider
      errorView={ErrorViewComponent ? <ErrorViewComponent /> : null}
    >
      <WrappedComponent {...props} />
    </TurbotErrorHandlerProvider>
  );
};

export default withTurbotErrorHandlerProvider;
