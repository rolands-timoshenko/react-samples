import React from "react";
import TurbotAwsSignInButtonStyles from "./TurbotAwsSignInButton.styles";
import TurbotLoginSelect from "../../turbotLoginSelect/TurbotLoginSelect";
import { compose } from "redux";
import { withStyles, withTheme } from "@material-ui/core";

const TurbotAwsSignInButton = ({
  classes,
  loginOptions,
  onClick,
  processing
}) => {
  return (
    <TurbotLoginSelect
      buttonClasses={classes}
      disabled={processing}
      label={processing ? "Loading..." : "AWS"}
      options={loginOptions}
      onSelect={onClick}
    />
  );
};

export default compose(withStyles(TurbotAwsSignInButtonStyles))(
  TurbotAwsSignInButton
);
