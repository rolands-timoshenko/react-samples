import TurbotErrorHandlerPageMessage from "../turbotErrorHandlerPageMessage/TurbotErrorHandlerPageMessage";
import withTurbotErrorHandlerProvider from "./withTurbotErrorHandlerProvider";

const withTurbotErrorHandlerPageError = WrappedComponent => {
  return withTurbotErrorHandlerProvider(TurbotErrorHandlerPageMessage)(
    WrappedComponent
  );
};

export default withTurbotErrorHandlerPageError;
