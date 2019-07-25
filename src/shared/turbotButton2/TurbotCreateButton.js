import React from "react";
import TurbotButton from "./TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotCreateButton = ({
  disabled,
  onClick,
  theme,
  title = "Create",
  variant = "success"
}) => (
  <TurbotButton
    disabled={disabled}
    size="sm"
    style={{ marginLeft: theme.spacing.unit }}
    variant={variant}
    onClick={onClick}
  >
    {title}
  </TurbotButton>
);

export default withTheme()(TurbotCreateButton);
