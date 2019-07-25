import React from "react";
import TurbotAzureSignInButtonStyles from "./TurbotAzureSignInButton.styles";
import TurbotAzureSignInLabel from "./TurbotAzureSignInLabel";
import TurbotButton from "../../turbotButton2/TurbotButton";
import { compose } from "react-apollo";
import { withStyles, withTheme } from "@material-ui/core";

const TurbotAzureSignInButton = ({
  classes,
  loginLevelResource,
  onClick,
  processing,
  resource,
  style
}) => {
  // const renderAsButton = () => {
  return (
    <TurbotButton
      disabled={processing}
      onClick={onClick}
      variant="contained"
      size="sm"
      className={classes.button__root}
      style={style}
    >
      <TurbotAzureSignInLabel
        loginLevelResource={loginLevelResource}
        processing={processing}
        resource={resource}
      />
    </TurbotButton>
  );
  // };

  // const renderAsText = () => {
  //   return (
  //     <div style={{ color: "inherit", padding: 10 }}>
  //       <TurbotAzureSignInLabel processing={processing} />
  //     </div>
  //   );
  // };

  // return asText ? renderAsText() : renderAsButton();
};

export default compose(
  withTheme(),
  withStyles(TurbotAzureSignInButtonStyles)
)(TurbotAzureSignInButton);
