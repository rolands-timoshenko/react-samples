import React from "react";
import TurbotButton from "./TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotDeleteButton = ({
  disabled,
  onClick,
  theme,
  title = "Delete",
  variant = "danger"
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

export default withTheme()(TurbotDeleteButton);
