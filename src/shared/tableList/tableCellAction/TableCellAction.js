import TableCell from "@material-ui/core/TableCell";
import React from "react";

const TableCellAction = ({ children, style }) => {
  const mergedStyles = {
    padding: 6,
    verticalAlign: "top",
    width: "1%",
    whiteSpace: "nowrap",
    ...style
  };
  return (
    <TableCell align="right" style={mergedStyles}>
      {children}
    </TableCell>
  );
};

export default TableCellAction;
