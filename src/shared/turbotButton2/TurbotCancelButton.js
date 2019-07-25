import React from "react";
import TurbotButton from "./TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotCancelButton = ({
  onClick,
  theme,
  title = "Cancel",
  autoFocus = false
}) => (
  <TurbotButton
    autoFocus={autoFocus}
    size="sm"
    variant="outline-light"
    onClick={onClick}
    style={{
      borderColor: theme.palette.text.breadcrumb,
      color: theme.palette.text.breadcrumb
    }}
  >
    {title}
  </TurbotButton>
);

export default withTheme()(TurbotCancelButton);
