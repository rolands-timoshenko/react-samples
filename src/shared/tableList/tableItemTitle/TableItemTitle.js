import React from "react";
import PropTypes from "prop-types";
import TableItemTitleStyles from "./TableItemTitle.styles";
import TurbotBreadcrumbs from "../../turbotBreadcrumbs/TurbotBreadcrumbs";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { getTitle } from "../../../utils/resources";

const propTypes = {
  asFilter: PropTypes.bool,
  asLinks: PropTypes.bool,
  filterKey: PropTypes.string,
  filterValue: PropTypes.string,
  title: PropTypes.any,
  withBreadcrumbs: PropTypes.bool
};

const TableItemTitle = ({
  asLinks = true,
  asText = false,
  classes,
  item,
  onTitleClick,
  style,
  title,
  titleAsFilter = false,
  withBreadcrumbs = true
}) => {
  const TitleClasses = {
    root:
      onTitleClick && titleAsFilter
        ? classes.title__root__filter
        : (asText && onTitleClick) || asText
        ? classes.title__root__text
        : onTitleClick
        ? classes.title__root__clickable
        : classes.title__root,
    body1: classes.title__body1
  };

  const TurbotIconClasses = {
    root: classes.icon_root
  };

  let breadcrumbs;
  if (withBreadcrumbs) {
    breadcrumbs =
      item && item.trunk && item.trunk.items && item.trunk.items.length > 1
        ? item.trunk.items.slice(0, item.trunk.items.length - 1).map(trunk => ({
            label: getTitle(trunk) || trunk.turbot.id,
            value: trunk.turbot.id
          }))
        : null;
  }

  return (
    <div className={classes.root} style={style}>
      <Typography variant="body1" classes={TitleClasses}>
        <span onClick={onTitleClick}>
          {title}
          {titleAsFilter && (
            <sup>
              <TurbotIcon
                classes={TurbotIconClasses}
                icon={["far", "filter"]}
              />
            </sup>
          )}
        </span>
      </Typography>
      {withBreadcrumbs && (
        <Typography
          variant="caption"
          noWrap={true}
          style={{
            direction: "rtl",
            marginLeft: "-4px",
            paddingLeft: "4px"
          }}
        >
          <TurbotBreadcrumbs links={asLinks} breadcrumbs={breadcrumbs} />
        </Typography>
      )}
    </div>
  );
};

TableItemTitle.propTypes = propTypes;

export default withStyles(TableItemTitleStyles)(TableItemTitle);
