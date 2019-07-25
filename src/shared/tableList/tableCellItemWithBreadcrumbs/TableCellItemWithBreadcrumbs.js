import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { withTheme } from "@material-ui/core/styles";

const TableCellItemWithBreadcrumbs = ({
  children,
  style,
  theme,
  fit = false,
  ...rest
}) => {
  const mergedStyles = {
    padding: "0.7rem 0.6rem 0.6rem",
    fontSize: theme.typography.body2.fontSize,
    verticalAlign: "top",
    ...(fit && { width: 1, whiteSpace: "nowrap" }),
    ...style
  };

  return (
    <TableCell {...rest} style={mergedStyles}>
      {children}
    </TableCell>
  );
};

export default withTheme()(TableCellItemWithBreadcrumbs);
