import React from "react";
import TurbotButton from "./TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotToggleButton = ({ disabled, onClick, theme, title, status }) => {
  const variant = status === "Active" ? "danger" : "warning";
  return (
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
};

export default withTheme()(TurbotToggleButton);
