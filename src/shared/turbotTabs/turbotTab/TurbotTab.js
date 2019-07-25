import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import TurbotTabStyles from "./TurbotTab.styles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import { compose } from "react-apollo";
import { withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const TurbotTabIconType = PropTypes.shape({
  class: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
});

const propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  icon: TurbotTabIconType
};

const TurbotTab = ({
  classes,
  label,
  value,
  icon,
  selected,
  theme,
  ...rest
}) => {
  const { tab__icon, ...restClasses } = classes;
  return (
    <Tab
      {...rest}
      classes={restClasses}
      label={label}
      value={value}
      icon={
        icon && (
          <TurbotIcon
            className={tab__icon}
            icon={[icon.class, icon.icon]}
            style={{
              color: icon.color
                ? icon.color
                : selected
                ? theme.palette.text.primary
                : null
            }}
            size="large"
          />
        )
      }
    />
  );
};

TurbotTab.propTypes = propTypes;

const enhance = compose(
  withStyles(TurbotTabStyles),
  withTheme()
);

export default enhance(TurbotTab);
