import React from "react";
import TableCellText from "../tableCellText/TableCellText";
import { withTheme } from "@material-ui/core/styles";

const TableCellContentHeaderText = ({
  children,
  style,
  theme,
  fit = false,
  ...rest
}) => {
  const styles = {
    color: theme.palette.grey.icon,
    fontWeight: theme.typography.fontWeightMedium
  };

  return (
    <TableCellText {...rest} style={styles}>
      {children}
    </TableCellText>
  );
};

export default withTheme()(TableCellContentHeaderText);
