import React from "react";
import withListQuery from "../../../../hoc/withListQuery";
import QUERY from "../TurbotNotificationLogs.query";
import TurbotNotificationLogsContainer from "../TurbotNotificationLogsContainer";

const TurbotNotificationLogsWithListQuery = props => {
  return <TurbotNotificationLogsContainer {...props} />;
};

export default withListQuery("processLogList", QUERY)(
  TurbotNotificationLogsWithListQuery
);
