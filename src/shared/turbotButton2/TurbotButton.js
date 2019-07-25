import React from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import { Button } from "react-bootstrap";

const TurbotButton = ({
  children,
  disabled,
  onClick,
  onFocus,
  size = "sm",
  style = {},
  theme,
  variant,
  className
}) => {
  let buttonStyles = {};
  if (size === "sm") {
    buttonStyles = theme.forms.button.small;
  }
  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={onClick}
      onFocus={onFocus}
      size={size}
      style={{
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5,
        whiteSpace: "nowrap",
        ...buttonStyles,
        ...style
      }}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default withTheme()(TurbotButton);
