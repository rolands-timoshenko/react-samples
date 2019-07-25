import React from "react";
import TableCellText from "../tableCellText/TableCellText";
import TableRow from "@material-ui/core/TableRow";
import TableRowLoadMoreStyles from "./TableRowLoadMore.styles";
import TurbotLoadMore from "../../turbotList/turbotLoadMore/TurbotLoadMore";
import { withStyles } from "@material-ui/core/styles";

const TableRowLoadMore = ({
  classes,
  colSpan = 10,
  processing,
  onLoadMore
}) => {
  return (
    <TableRow key="list-loader" classes={{ root: classes.row }}>
      <TableCellText colSpan={colSpan} style={{ whiteSpace: "nowrap" }}>
        <TurbotLoadMore
          insideTable
          processing={processing}
          onLoadMore={onLoadMore}
        />
      </TableCellText>
    </TableRow>
  );
};

export default withStyles(TableRowLoadMoreStyles)(TableRowLoadMore);
