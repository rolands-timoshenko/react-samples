import React from "react";
import ActionFilterBreadcrumbsContainer from "../actionFilterBreadcrumbs/ActionFilterBreadcrumbsContainer";
import ActionFiltersStyles from "./ActionFilters.styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const TypeActionFilters = PropTypes.shape({
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array.isRequired
});

const propTypes = {
  filters: PropTypes.arrayOf(TypeActionFilters),
  close: () => {}
};

const ActionFilters = ({ classes, filters, close }) => {
  const TableCellClasses = {
    root: classes.tableCell__root
  };

  const TableRowClasses = {
    root: classes.tableRow__root
  };

  const TableBodyClasses = isLast => {
    let root = [`${classes.tableBody__root}`];
    if (!isLast) {
      root.push(`${classes.tableBody__root}--last`);
    }
    return {
      root: root.join(" ")
    };
  };

  const TypographyClasses = {
    root: classes.typography__root
  };

  const isLastRow = (arr, index) => {
    return arr.length - 1 === index;
  };

  return (
    <div className={classes.root} onClick={evt => evt.stopPropagation()}>
      <Table>
        {filters.map((filter, index) => {
          const isLast = isLastRow(filters, index);
          return (
            <TableBody classes={TableBodyClasses(isLast)} key={filter.title}>
              <TableRow classes={TableRowClasses}>
                <TableCell classes={TableCellClasses}>
                  <Typography classes={TypographyClasses} variant="subtitle1">
                    {filter.title}
                  </Typography>
                </TableCell>
              </TableRow>
              <ActionFilterBreadcrumbsContainer
                close={close}
                breadcrumbs={filter.breadcrumbs}
              />
            </TableBody>
          );
        })}
      </Table>
    </div>
  );
};

ActionFilters.propTypes = propTypes;

export default withStyles(ActionFiltersStyles)(ActionFilters);
