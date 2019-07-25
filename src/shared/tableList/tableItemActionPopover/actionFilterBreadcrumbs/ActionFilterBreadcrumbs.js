import React from "react";
import ActionFilterBreadcrumbsStyles from "./ActionFilterBreadcrumbs.styles";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import { withStyles } from "@material-ui/core/styles";

const TypeBreacrumbs = PropTypes.shape({
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  actionCmp: PropTypes.element
});

const propTypes = {
  breadcrumbs: PropTypes.arrayOf(TypeBreacrumbs),
  onClick: PropTypes.func
};

const ActionFilterBreadcrumbs = ({
  breadcrumbs,
  classes,
  hasPermissionForType,
  onClick = () => {}
}) => {
  const TableCellClasses = {
    root: classes.tableCell__root
  };

  const TableRowClasses = {
    root: classes.tableRow__root
  };

  const TitleTypographyClasses = {
    root: classes.titleTypography__root
  };

  const LinkTypographyClasses = clickable => {
    return {
      root: clickable
        ? classes.linkTypographyClickable__root
        : classes.linkTypography__root
    };
  };

  const TurbotIconClasses = {
    root: classes.turbotIcon__root
  };

  return breadcrumbs.map(item => {
    const title = item.title;
    return (
      <TableRow classes={TableRowClasses} key={title}>
        <TableCell classes={TableCellClasses}>
          <Typography classes={TitleTypographyClasses} variant="caption">
            {title}
          </Typography>
        </TableCell>
        <TableCell classes={TableCellClasses}>
          {item.actionCmp
            ? item.actionCmp
            : item.filters
                .map(filter => {
                  const hasPermission = hasPermissionForType(
                    filter.key,
                    filter.path
                  );
                  return hasPermission ? (
                    <Typography
                      key={`filter-menu-${filter.value}`}
                      classes={LinkTypographyClasses(hasPermission)}
                      onClick={onClick(filter.key, filter.value)}
                      variant="body1"
                    >
                      {filter.label}
                      <sup>
                        <TurbotIcon
                          classes={TurbotIconClasses}
                          icon={["far", "filter"]}
                        />
                      </sup>
                    </Typography>
                  ) : (
                    <Typography
                      key={`filter-menu-${filter.value}`}
                      classes={LinkTypographyClasses(hasPermission)}
                      variant="body1"
                    >
                      {filter.label}
                    </Typography>
                  );
                })
                .map((breadcrumb, index) => [
                  index > 0 && (
                    <span
                      key={index}
                      style={{ fontSize: 11, paddingLeft: 6, paddingRight: 6 }}
                    >
                      >
                    </span>
                  ),
                  breadcrumb
                ])}
        </TableCell>
      </TableRow>
    );
  });
};

ActionFilterBreadcrumbs.propTypes = propTypes;

export default withStyles(ActionFilterBreadcrumbsStyles)(
  ActionFilterBreadcrumbs
);
