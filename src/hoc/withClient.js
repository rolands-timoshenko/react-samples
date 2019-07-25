import React from "react";
import { ApolloConsumer } from "react-apollo";
import TurbotErrorHandlerConsumer from "../shared/turbotErrorHandler/TurbotErrorHandlerConsumer";

const withClient = WrappedComponent => {
  return props => (
    <ApolloConsumer>
      {client => (
        <TurbotErrorHandlerConsumer>
          <WrappedComponent {...props} client={client} />
        </TurbotErrorHandlerConsumer>
      )}
    </ApolloConsumer>
  );
};

export default withClient;
