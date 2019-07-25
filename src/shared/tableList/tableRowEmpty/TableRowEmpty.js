import React from "react";
import PropTypes from "prop-types";
import TableCellText from "../tableCellText/TableCellText";
import TableRow from "@material-ui/core/TableRow";
import TableRowEmptyStyles from "./TableRowEmpty.styles";
import withFilterContext from "../../listFilter/hoc/withFilterContext";
import { withStyles } from "@material-ui/core";

const propTypes = {
  filtersAsUrlQuery: PropTypes.string,
  onUpdateFilter: PropTypes.func
};

const renderResetFilter = (classes, onUpdateFilter) => (
  <a className={classes.reset} onClick={() => onUpdateFilter("")}>
    .&nbsp;Reset filter.
  </a>
);

const TableRowEmpty = ({
  classes,
  colSpan = 1,
  filtersAsUrlQuery,
  noItemsText,
  showFilterReset,
  onUpdateFilter
}) => {
  return (
    <TableRow key="list-empty" classes={{ root: classes.row }}>
      <TableCellText colSpan={colSpan}>
        <span className={classes.emptyMessage}>
          {noItemsText || "No matches"}
          {showFilterReset &&
            filtersAsUrlQuery !== "" &&
            renderResetFilter(classes, onUpdateFilter)}
        </span>
      </TableCellText>
    </TableRow>
  );
};

TableRowEmpty.propTypes = propTypes;

export default withFilterContext(
  withStyles(TableRowEmptyStyles)(TableRowEmpty)
);
