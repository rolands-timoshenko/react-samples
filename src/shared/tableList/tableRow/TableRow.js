import React from "react";
import MuiTableRow from "@material-ui/core/TableRow";
import TableRowStyles from "./TableRow.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const TableRow = ({ classes, children }) => {
  return <MuiTableRow classes={classes}>{children}</MuiTableRow>;
};

export default withStyles(TableRowStyles)(TableRow);
