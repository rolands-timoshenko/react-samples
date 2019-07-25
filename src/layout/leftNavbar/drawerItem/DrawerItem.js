import React from "react";
import DrawerItemStyles from "./DrawerItem.styles";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import TurbotIcon from "../../../shared/turbotIcon/TurbotIcon";
import { withStyles } from "@material-ui/core/styles";

const TypeIcon = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

const propTypes = {
  onClick: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func,
  icon: TypeIcon,
  selected: PropTypes.bool,
  canRemove: PropTypes.bool,
  hasDropdown: PropTypes.bool,
  dropDownOpen: PropTypes.bool,
  dropdownDirection: PropTypes.oneOf(["down", "right"])
};
// TODO: @task: refactor code. Change to more reasonable name
const DrawerItem = ({
  classes,
  onClick,
  onClickRemove,
  topNarrow = false,
  bottomNarrow = false,
  selected = false,
  canRemove = false,
  hasDropdown = false,
  dropDownOpen = false,
  dropdownDirection = "down",
  children
}) => {
  const gutters = (() => {
    const classesArr = [classes.gutters];
    topNarrow && classesArr.push(classes.gutters + "--topNarrow");
    bottomNarrow && classesArr.push(classes.gutters + "--bottomNarrow");
    return classesArr.join(" ");
  })();

  const renderDropdownIcon = () => {
    const dropDownIconStyle = {
      marginRight: "4px"
    };
    return (
      <TurbotIcon
        style={dropDownIconStyle}
        onClick={canRemove ? onClick : null}
        icon={
          dropDownOpen
            ? dropdownDirection === "down"
              ? ["fal", "angle-up"]
              : ["fal", "angle-right"]
            : dropdownDirection === "down"
            ? ["fal", "angle-down"]
            : ["fal", "angle-right"]
        }
      />
    );
  };

  const handleClick = evt => onClick(evt);
  const handleClickRemove = evt => {
    evt.stopPropagation();
    onClickRemove(evt);
  };
  return (
    <ListItem
      selected={selected}
      classes={{
        ...classes,
        gutters,
        selected: selected ? classes.selected : null
      }}
      button
      onClick={handleClick}
    >
      {children}
      {canRemove && (
        <TurbotIcon
          style={{ marginRight: "6px" }}
          onClick={handleClickRemove}
          icon={["fal", "times"]}
        />
      )}
      {hasDropdown && renderDropdownIcon()}
    </ListItem>
  );
};

DrawerItem.propTypes = propTypes;

export default withStyles(DrawerItemStyles)(DrawerItem);
