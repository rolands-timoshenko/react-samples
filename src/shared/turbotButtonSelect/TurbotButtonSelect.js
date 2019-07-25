import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TurbotButton from "../turbotButton2/TurbotButton";
import TurbotButtonSelectStyles from "./TurbotButtonSelect.styles";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotMenu from "../turbotMenu/TurbotMenu";
import TurbotMenuItem from "../turbotMenuItem/TurbotMenuItem";
import { TypeOrigin } from "../turbotSelect/TurbotSelect";
import { withStyles } from "@material-ui/core";

const TypeIcon = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

export const TypeOption = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  value: PropTypes.string.isRequired,
  icon: TypeIcon
});

const propTypes = {
  options: PropTypes.arrayOf(TypeOption).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onUnselect: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.any,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.string,
  anchorEl: PropTypes.any,
  anchorOrigin: TypeOrigin,
  transformOrigin: TypeOrigin
};

const TurbotButtonSelect = ({
  buttonClasses = {},
  classes,
  disabled,
  style,
  label,
  size = "sm",
  variant = "outlined",
  color = "secondary",
  onClick,
  onSelect,
  onClose,
  options,
  anchorEl,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "left"
  }
}) => {
  const TurbotButtonClasses = {
    root: classes.turbotButton__root
  };

  let buttonClassName = TurbotButtonClasses.root;
  if (buttonClasses) {
    buttonClassName = classNames(
      TurbotButtonClasses.root,
      buttonClasses.button__root
    );
  }

  const menuId = `turbot-button-select-menu`;

  return (
    <div style={style}>
      <TurbotButton
        classes={TurbotButtonClasses}
        className={buttonClassName}
        disabled={disabled}
        size={size}
        variant={variant}
        color={color}
        onClick={onClick}
        aria-owns={anchorEl ? menuId : undefined}
      >
        {label}
        <TurbotIcon icon={"caret-down"} />
      </TurbotButton>
      <TurbotMenu
        id={menuId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        getContentAnchorEl={null}
      >
        {options.map(option => {
          return (
            <TurbotMenuItem
              key={`${option.value}-${option.label}`}
              value={option.value}
              onClick={() => onSelect(option)}
            >
              {option.label}
            </TurbotMenuItem>
          );
        })}
      </TurbotMenu>
    </div>
  );
};

TurbotButtonSelect.propTypes = propTypes;

export default withStyles(TurbotButtonSelectStyles)(TurbotButtonSelect);
