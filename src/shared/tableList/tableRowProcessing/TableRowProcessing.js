import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableCellWrapper from "../tableListWrapper/TableCellWrapper";
import TableRow from "@material-ui/core/TableRow";
import TableRowProcessingStyles from "./TableRowProcessing.styles";
import TurbotLoader from "../../turbotLoader/TurbotLoader";
import { withStyles } from "@material-ui/core/styles";

const TableRowProcessing = ({
  classes,
  colSpan = 1,
  colStyle = {},
  processingText = "Loading..."
}) => {
  return (
    <TableRow key="list-loader">
      <TableCell
        colSpan={colSpan}
        style={{ padding: "0 0 0 20px", ...colStyle }}
      >
        <TableCellWrapper>
          <div className={classes.loader}>
            <TurbotLoader inline />
            &nbsp;&nbsp;
            <span>{processingText}</span>
          </div>
        </TableCellWrapper>
      </TableCell>
    </TableRow>
  );
};

export default withStyles(TableRowProcessingStyles)(TableRowProcessing);
