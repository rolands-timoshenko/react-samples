const TurbotFunctionWrapper = ({ children, ...props }) =>
  children({ ...props });

export default TurbotFunctionWrapper;
