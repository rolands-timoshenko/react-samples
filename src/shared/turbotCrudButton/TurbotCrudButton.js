import { withTheme } from "@material-ui/core";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import TurbotButton from "../turbotButton2/TurbotButton";
import TurbotCrudButtonStyles from "./TurbotCrudButton.styles";

export const CrudButtonHoverStates = Object.freeze({
  DELETE: "delete",
  UPDATE: "update",
  CREATE: "create"
});

export const CrudButtonVariants = Object.freeze({
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  DEFAULT: "secondary"
});

export const CrudButtonSize = Object.freeze({
  SMALL: "sm",
  LARGE: "lg"
});

const propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  dialogOpen: PropTypes.bool,
  dialogCmp: PropTypes.element,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
  variant: PropTypes.oneOf([
    CrudButtonVariants.DANGER,
    CrudButtonVariants.DEFAULT,
    CrudButtonVariants.SUCCESS,
    CrudButtonVariants.WARNING
  ]),
  hoverState: PropTypes.oneOf([
    CrudButtonHoverStates.CREATE,
    CrudButtonHoverStates.UPDATE,
    CrudButtonHoverStates.DELETE
  ]),
  size: PropTypes.oneOf([CrudButtonSize.SMALL, CrudButtonSize.LARGE]),
  iconType: PropTypes.bool
};

const TurbotCrudButton = ({
  theme,
  classes,
  dialogOpen,
  onClick,
  onClose,
  dialogCmp,
  label,
  style,
  variant = CrudButtonVariants.DEFAULT,
  size = "sm",
  hoverState,
  isDisabled,
  outline = false,
  iconType = false
}) => {
  const getTurbotButtonClassName = (
    defaultClassName,
    hoverState,
    size,
    variant
  ) => {
    const classNames = [defaultClassName];
    hoverState && classNames.push(`${defaultClassName}--${hoverState}`);
    size && classNames.push(`${defaultClassName}--${size}`);
    variant && classNames.push(`${defaultClassName}--${variant}`);
    isDisabled && classNames.push(`${defaultClassName}--Disabled`);
    return classNames.join(" ");
  };

  const getTurbotButtonVariant = (variant, outline) => {
    return outline ? `outline-${variant}` : variant;
  };

  return (
    <Fragment>
      <TurbotButton
        className={getTurbotButtonClassName(
          classes.button,
          hoverState,
          size,
          variant
        )}
        // In TurbotButton styles are added through style attr, so to overwrite them we use style prop as well
        // FIXME: get ride of style here. Use classes instead
        style={{
          paddingLeft: theme.spacing.unit * 1,
          paddingRight: theme.spacing.unit * 1,
          ...(iconType && {
            paddingLeft: theme.spacing.unit * 0.7,
            paddingRight: theme.spacing.unit * 0.7,
            paddingTop: 1,
            paddingBottom: 0,
            height: size === "sm" ? 20 : 26,
            fontSize: size === "sm" ? "0.65rem" : "0.85rem",
            lineHeight: size === "sm" ? "0.65rem" : "0.85rem"
          }),
          ...style
        }}
        size={size}
        onClick={onClick}
        variant={getTurbotButtonVariant(variant, outline)}
        disabled={isDisabled}
      >
        {label}
      </TurbotButton>
      {dialogOpen &&
        dialogCmp &&
        React.cloneElement(dialogCmp, { onClose: onClose })}
    </Fragment>
  );
};

TurbotCrudButton.propTypes = propTypes;

const enhance = compose(
  withTheme(),
  withStyles(TurbotCrudButtonStyles)
);

export default enhance(TurbotCrudButton);
