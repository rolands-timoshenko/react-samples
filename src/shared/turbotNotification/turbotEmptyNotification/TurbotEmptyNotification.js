import React from "react";
import RowTableItem from "../../tableList/rowTableItem/RowTableItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TurbotLogsMessageContainer from "../turbotNotificationLogs/turbotLogsMessage/TurbotLogsMessageContainer";
import { withTheme } from "@material-ui/core/styles";

const TurbotEmptyNotification = ({ logMessage, logType, theme }) => {
  return (
    <Table style={{ marginBottom: "3rem" }}>
      <TableBody>
        <RowTableItem
          cellSizes={["80px", "40px", "auto"]}
          cellStyle={{
            padding: ".75rem",
            verticalAlign: "top",
            fontSize: theme.typography.body2.fontSize,
            borderBottom: "none"
          }}
          keys={[
            () => (
              <TurbotLogsMessageContainer message={logMessage} type={logType} />
            )
          ]}
          hover={false}
        />
      </TableBody>
    </Table>
  );
};

export default withTheme()(TurbotEmptyNotification);
