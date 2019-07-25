import React from "react";
import TurbotAlert, { AlertTypes } from "../turbotAlert/TurbotAlert";

const TurbotErrors = ({ errors = [], onCloseError, style }) =>
  errors.map((error, errorIndex) => (
    <div key={errorIndex} style={style}>
      <TurbotAlert
        message={error.message}
        type={AlertTypes.ERROR}
        onClose={() => onCloseError(errorIndex)}
      />
    </div>
  ));

export default TurbotErrors;
