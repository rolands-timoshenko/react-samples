import React, { Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotSelectStyles from "./TurbotSelect.styles";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TurbotMenuItem from "../turbotMenuItem/TurbotMenuItem";
import TurbotMenu from "../turbotMenu/TurbotMenu";

export const TypeOption = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

export const TypeOrigin = PropTypes.shape({
  horizontal: PropTypes.oneOf(["left", "center", "right"]).isRequired,
  vertical: PropTypes.oneOf(["top", "center", "bottom"]).isRequired
});

// TODO: define props
const propTypes = {
  label: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(TypeOption).isRequired,
  anchorEl: PropTypes.any,
  anchorOrigin: TypeOrigin,
  transformOrigin: TypeOrigin,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(TypeOption),
  selectedInLabel: PropTypes.bool,
  allEnabledOverride: PropTypes.string
};

const TurbotSelect = ({
  classes,
  label,
  options,
  anchorEl,
  onClick,
  onClose,
  onSelect,
  style,
  selected,
  selectedInLabel,
  allEnabledOverride,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right"
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right"
  }
}) => {
  const handleSelect = option => () => onSelect(option);

  const TypographyClasses = {
    root: classes.typography__root,
    body2: classes.typography_body2
  };

  const menuId = `${label}-turbot-select-menu`;
  const allEnabled = selected.length === options.length;
  const hasEnabledOverride = allEnabledOverride && allEnabledOverride.length;

  return (
    <Fragment>
      <div
        style={style}
        className={classes.root}
        onClick={onClick}
        aria-owns={anchorEl ? menuId : undefined}
      >
        <Typography classes={TypographyClasses} variant="body2">
          {label}
          &nbsp;&nbsp;
          {allEnabled && hasEnabledOverride && (
            <span className={classes.selected}>
              {allEnabledOverride}&nbsp;&nbsp;
            </span>
          )}
          {selectedInLabel && (!hasEnabledOverride || !allEnabled) && (
            <span className={classes.selected}>
              {selected.map(item => item.label).join(", ")}&nbsp;&nbsp;
            </span>
          )}
          <TurbotIcon icon={"caret-down"} />
        </Typography>
      </div>
      <TurbotMenu
        id={menuId}
        classes={{ paper: classes.menu__paper }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        getContentAnchorEl={null}
      >
        {options.map(option => {
          const optionSelected = selected.find(
            item => item.value === option.value
          );
          return (
            <TurbotMenuItem
              key={option.value}
              value={option.value}
              onClick={handleSelect(option)}
              selected={optionSelected ? true : false}
            >
              <div className={classes.menuItemIcon}>
                {optionSelected && (
                  <TurbotIcon fixedWidth={true} icon="check" size="xs" />
                )}
              </div>
              <div className={classes.menuItemLabel}>{option.label}</div>
            </TurbotMenuItem>
          );
        })}
      </TurbotMenu>
    </Fragment>
  );
};

TurbotSelect.propTypes = propTypes;

export default withStyles(TurbotSelectStyles)(TurbotSelect);
