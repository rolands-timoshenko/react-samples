import React from "react";
import BrowseItemStyles from "./BrowseItem.styles";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import TurbotIcon from "../../../../../shared/turbotIcon/TurbotIcon";
import TurbotTitle from "../../../../../shared/turbotTitle/TurbotTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  getTitle,
  getNavigationNodeTitle,
  getBreadcrumbString
} from "../../../../../utils/resources";

const TTurbotTypeItem = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: PropTypes.string
});

const TTypeItem = PropTypes.shape({
  icon: PropTypes.string,
  title: PropTypes.string
});

export const TBrowseItem = PropTypes.shape({
  turbot: TTurbotTypeItem,
  title: PropTypes.string,
  type: TTypeItem
});

const propTypes = {
  item: TBrowseItem.isRequired,
  onSelect: PropTypes.func
};

const title = (item, classes, isClickable) => {
  let tooltip = item.resourceCount
    ? getBreadcrumbString(item.type.trunk) + `: ${item.resourceCount} items`
    : getTitle(item);
  return (
    <TurbotTitle
      customClass={isClickable ? classes.titleClickable : classes.title}
      customTooltip={tooltip}
    >
      {item.resourceCount ? getNavigationNodeTitle(item) : getTitle(item)}
    </TurbotTitle>
  );
};

const icon = (item, classes) => (
  <span className={classes.icon}>
    <TurbotIcon
      icon={item.icon ? item.icon : item.type ? item.type.icon : null}
      style={{ width: "1rem" }}
    />
  </span>
);

const BrowseItem = ({ classes, item, onSelect }) => {
  const isClickable = !!onSelect;
  const isNavigationNode = !!item.resourceCount;
  return (
    <ListItem
      className={isClickable ? classes.rootClickable : classes.root}
      onClick={
        isClickable ? () => onSelect(item, true, true, isNavigationNode) : null
      }
      key={item.turbot.id || item.turbot.navigationNodeId}
    >
      {icon(item, classes)}
      {title(item, classes, isClickable)}
    </ListItem>
  );
};

BrowseItem.propTypes = propTypes;

export default withStyles(BrowseItemStyles)(BrowseItem);
