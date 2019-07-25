import PropTypes from "prop-types";
import React from "react";
import { TurbotErrorContext } from "./TurbotErrorHandlerProvider";

export const TypeErrorHandler = PropTypes.shape({
  error: PropTypes.any,
  info: PropTypes.any,
  setError: PropTypes.func
});

const TurbotErrorHandlerConsumer = ({ children }) => {
  return (
    <TurbotErrorContext.Consumer>
      {({ error, info, setError, getErrorMessages }) => {
        return React.cloneElement(children, {
          errorHandler: {
            error: error,
            info: info,
            setError: setError,
            getErrorMessages: getErrorMessages
          }
        });
      }}
    </TurbotErrorContext.Consumer>
  );
};

export default TurbotErrorHandlerConsumer;
