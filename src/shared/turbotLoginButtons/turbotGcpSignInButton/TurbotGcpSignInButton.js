import React from "react";
import TurbotButton from "../../turbotButton2/TurbotButton";
import TurbotGcpSignInButtonStyles from "./TurbotGcpSignInButton.styles";
import TurbotGcpSignInLabel from "./TurbotGcpSignInLabel";
import { compose } from "react-apollo";
import { withStyles, withTheme } from "@material-ui/core";

const TurbotGcpSignInButton = ({
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
      <TurbotGcpSignInLabel
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
  //       <TurbotGcpSignInLabel processing={processing} projectId={projectId} />
  //     </div>
  //   );
  // };

  // return asText ? renderAsText() : renderAsButton();
};

export default compose(
  withTheme(),
  withStyles(TurbotGcpSignInButtonStyles)
)(TurbotGcpSignInButton);
