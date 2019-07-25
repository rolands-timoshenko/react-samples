import { makeStyles } from "@material-ui/styles";
import { compose } from "redux";
import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "@material-ui/core";
import TurbotChipStyles from "./TurbotChip.styles";
import TurbotTooltip from "../turbotTooltip/TurbotTooltip";

const propTypes = {
  label: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
  style: PropTypes.object,
  // Should be rgb color "66, 134, 244"
  color: PropTypes.string,
  invert: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

const TurbotChip = ({
  theme,
  color,
  style,
  label,
  tooltip,
  actions,
  invert = false
}) => {
  const classes = makeStyles(TurbotChipStyles(theme, color, invert), {
    name: "TurbotChip"
  })();
  return (
    <span style={style} className={classes.container}>
      <TurbotTooltip title={tooltip || label}>
        <span className={classes.label}>{label}</span>
      </TurbotTooltip>
      {actions &&
        actions.map((action, index) => (
          <span key={index} className={classes.action}>
            {action}
          </span>
        ))}
    </span>
  );
};

TurbotChip.propTypes = propTypes;

const enhance = compose(withTheme());

export default enhance(TurbotChip);
