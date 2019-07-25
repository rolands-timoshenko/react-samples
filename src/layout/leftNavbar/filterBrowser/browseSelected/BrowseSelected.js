import React from "react";
import BrowseSelectedStyles from "./BrowseSelected.styles";
import { TBrowseItem } from "../browseList/BrowseList";
import DrawerItem from "../../drawerItem/DrawerItem";
import DrawerItemIcon from "../../drawerItem/drawerItemIcon/DrawerItemIcon";
import DrawerItemText from "../../drawerItem/drawerItemText/DrawerItemText";
import TurbotTitle from "../../../../shared/turbotTitle/TurbotTitle";
import { getTitle } from "../../../../utils/resources";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import { withStyles, withTheme } from "@material-ui/core/styles";

const propTypes = {
  selected: TBrowseItem.isRequired,
  onClick: PropTypes.func.isRequired
};

const BrowseSelected = ({
  classes,
  theme,
  isSelected,
  selected,
  action,
  onClick
}) => {
  const title = item => (
    <span
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }}
      className={classes.title}
    >
      {getTitle(item)}
    </span>
  );

  const drawerItemClasses = {
    root: classes.drawerItem__root,
    gutters: classes.drawerItem__gutters
  };

  const drawerItemTextClasses = {
    root: classes.drawerItemText__root,
    primary: classes.drawerItemText__primary
  };

  const drawerItemIconStyle = {
    width: "1rem",
    color: theme.palette.text.secondary
  };

  const renderAction = (action, selected) => {
    if (React.isValidElement(action))
      return React.cloneElement(action, { selected: selected });

    if (typeof action === "function") return action(selected);
    return null;
  };

  return (
    <DrawerItem
      selected={isSelected}
      classes={drawerItemClasses}
      onClick={() => onClick(selected)}
    >
      {selected && (
        <DrawerItemIcon
          style={drawerItemIconStyle}
          iconPosition={1}
          icon={
            selected.icon
              ? selected.icon
              : selected.type
              ? selected.type.icon
              : null
          }
        />
      )}
      <DrawerItemText classes={drawerItemTextClasses}>
        <span
          style={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "5px"
          }}
        >
          {<TurbotTitle>{title(selected)}</TurbotTitle>}
          {action && renderAction(action, selected)}
        </span>
      </DrawerItemText>
    </DrawerItem>
  );
};

BrowseSelected.propTypes = propTypes;

const enhance = compose(
  withTheme(),
  withStyles(BrowseSelectedStyles, { name: "BrowseSelected" })
);

export default enhance(BrowseSelected);
