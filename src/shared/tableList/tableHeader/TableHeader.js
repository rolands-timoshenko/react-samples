import PropTypes from "prop-types";
import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TurbotTableCell from "../../turbotTableCell/TurbotTableCellContainer";

const TypeItem = PropTypes.shape({
  title: PropTypes.string.isRequired,
  sortBy: PropTypes.object
});

const propTypes = {
  filters: PropTypes.string,
  onSort: PropTypes.func,
  items: PropTypes.arrayOf(TypeItem.isRequired)
};

const TableHeader = ({ items, filters, onSort }) => {
  return (
    <TableHead>
      <TableRow>
        {items &&
          items.map(child => (
            <TurbotTableCell
              filters={filters}
              key={child.title}
              title={child.title}
              sortBy={child.sortBy}
              onSort={onSort}
            />
          ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = propTypes;

export default TableHeader;
