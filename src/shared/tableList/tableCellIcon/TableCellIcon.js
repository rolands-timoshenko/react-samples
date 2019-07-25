import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { withTheme } from "@material-ui/core/styles";

const TableCellIcon = ({ children, style, fit = true, theme }) => {
  const mergedStyles = {
    padding: "0.8rem",
    color: theme.palette.grey["40"],
    fontSize: theme.typography.body1.fontSize,
    textAlign: "center",
    verticalAlign: "top",
    lineHeight: "1rem",
    ...(fit && { width: "1%", whiteSpace: "nowrap" }),
    ...style
  };

  return <TableCell style={mergedStyles}>{children}</TableCell>;
};

export default withTheme()(TableCellIcon);
