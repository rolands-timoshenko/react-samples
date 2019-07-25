import PropTypes from "prop-types";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableCellDateTimeStyles from "./TableCellDatetime.styles";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const propTypes = {
  avatar: PropTypes.element
};

const TableCellDatetime = ({ children, classes, style, avatar }) => {
  const mergedStyles = {
    padding: "0.6rem",
    verticalAlign: "top",
    width: 1,
    whiteSpace: "nowrap",
    ...style
  };

  return (
    <TableCell align="right" style={mergedStyles}>
      {avatar && avatar}
      <Typography classes={{ caption: classes.caption }} variant="caption">
        {children}
      </Typography>
    </TableCell>
  );
};

export default withStyles(TableCellDateTimeStyles)(TableCellDatetime);
