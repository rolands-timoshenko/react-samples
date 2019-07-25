import React from "react";
import PropTypes from "prop-types";
import { TableRow, withStyles } from "@material-ui/core";
import TableRowClickableStyles from "./TableRowClickable.styles";

const propTypes = {
  onClick: PropTypes.func
};

const TableRowClickable = ({
  classes,
  children,
  hover = true,
  onClick = () => {}
}) => {
  return (
    <TableRow classes={classes} hover={hover} onClick={onClick}>
      {children}
    </TableRow>
  );
};

TableRowClickable.propTypes = propTypes;

export default withStyles(TableRowClickableStyles)(TableRowClickable);
