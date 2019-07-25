import React from "react";
import TableRowError from "../tableList/tableRowError/TableRowError";
import TurbotTable from "../turbotTable/TurbotTable";
import { withStyles } from "@material-ui/core";
import TurbotErrorHandlerListMessageStyles from "./TurbotErrorHandlerListMessage.styles";

const TurbotErrorHandlerListMessage = ({
  classes,
  error = "Something went wrong!",
  onReset
}) => {
  const ErrorMessage = () => {
    return (
      <>
        <span>{error}</span>&nbsp;
        {onReset && (
          <span className={classes.reload} onClick={onReset}>
            Reload.
          </span>
        )}
      </>
    );
  };

  return (
    <TurbotTable>
      <TableRowError error={<ErrorMessage />} />
    </TurbotTable>
  );
};

export default withStyles(TurbotErrorHandlerListMessageStyles)(
  TurbotErrorHandlerListMessage
);
