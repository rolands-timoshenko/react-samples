import React from "react";
import PropTypes from "prop-types";
import TableCellText from "../tableCellText/TableCellText";
import TableRow from "@material-ui/core/TableRow";
import TableRowErrorStyles from "./TableRowError.styles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import { withStyles, Typography } from "@material-ui/core";

const propTypes = {
  error: PropTypes.string.isRequired
};

const TableRowError = ({ classes, colSpan = 1, error }) => {
  return (
    <TableRow key="list-error" classes={{ root: classes.row }}>
      <TableCellText colSpan={colSpan}>
        <Typography classes={{ root: classes.text }} variant="body1">
          <TurbotIcon icon={["fas", "exclamation-circle"]} /> &nbsp;
          <span>{error}</span>
        </Typography>
      </TableCellText>
    </TableRow>
  );
};

TableRowError.propTypes = propTypes;

export default withStyles(TableRowErrorStyles)(TableRowError);
