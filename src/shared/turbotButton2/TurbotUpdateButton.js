import React from "react";
import TurbotButton from "./TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotUpdateButton = ({
  disabled,
  onClick,
  theme,
  title = "Create",
  variant = "warning"
}) => (
  <TurbotButton
    disabled={disabled}
    size="sm"
    variant={variant}
    onClick={onClick}
    style={{ marginLeft: theme.spacing.unit }}
  >
    {title}
  </TurbotButton>
);

export default withTheme()(TurbotUpdateButton);
