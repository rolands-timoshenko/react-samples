import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import PropTypes from "prop-types";
import TurbotTableCellStyles from "./TurbotTableCell.styles";

const propTypes = {
  active: PropTypes.bool
};

const TurbotTableCell = ({ classes, active, children, ...rest }) => {
  const tableCellClasses = {
    root: active ? classes.root + "--active" : ""
  };
  return (
    <TableCell classes={tableCellClasses} {...rest}>
      {children}
    </TableCell>
  );
};

TurbotTableCell.propTypes = propTypes;

export default withStyles(TurbotTableCellStyles)(TurbotTableCell);
