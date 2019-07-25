import React from "react";
import PropTypes from "prop-types";
import TurbotIconStyles from "./TurbotIcon.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

const propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  size: PropTypes.oneOf(["xs", "small", "medium", "large"]),
  onClick: PropTypes.func
};

const TurbotIcon = ({
  classes,
  style,
  size,
  icon,
  onClick,
  className = "",
  fixedWidth = true,
  spin = false,
  ...rest
}) => {
  className += ` ${classes.root}`;

  if (size) {
    className += ` ${classes.root}--${size}`;
  }

  if (onClick) {
    className += ` ${classes.root}--clickable`;
  }

  const isStringIcon = icon && icon.constructor === String;

  if (
    isStringIcon &&
    (icon.startsWith("fab-") ||
      icon.startsWith("fal-") ||
      icon.startsWith("far-") ||
      icon.startsWith("fas-"))
  ) {
    const iconClass = icon.slice(0, 3);
    const iconName = icon.slice(4, icon.length);
    return (
      <FontAwesomeIcon
        style={style}
        className={className}
        icon={[iconClass, iconName]}
        onClick={onClick}
        spin={spin}
      />
    );
  }

  if (!icon || (isStringIcon && icon.startsWith("fa-"))) {
    // Temp until we have all icons in place
    return (
      <FontAwesomeIcon
        style={style}
        className={className}
        icon={["fal", "diamond"]}
        onClick={onClick}
      />
    );
  }

  return (
    <FontAwesomeIcon
      style={style}
      className={className}
      fixedWidth={fixedWidth}
      icon={icon}
      onClick={onClick}
      spin={spin}
      {...rest}
    />
  );
};

TurbotIcon.propTypes = propTypes;

export default withStyles(TurbotIconStyles, { name: "Turbot-Icon" })(
  TurbotIcon
);
