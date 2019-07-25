import React from "react";
import TurbotNotificationLogsContainer from "../TurbotNotificationLogsContainer";
import TurbotListPolling from "../../../turbotListPolling/TurbotListPolling";
import gql from "graphql-tag";

const QUERY = gql`
  query NotificationProcessLogs($filter: [String!], $paging: String) {
    data: processLogList(filter: $filter, paging: $paging) {
      items {
        level
        message
        data
        turbot {
          createTimestamp
        }
      }
      paging {
        poll
      }
    }
  }
`;

const key = "data";

const TurbotNotificationLogsWithListPolling = ({ terminate, ...props }) => {
  return (
    <TurbotListPolling terminate={terminate} query={QUERY} dataFetchKey={key}>
      <TurbotNotificationLogsContainer {...props} />
    </TurbotListPolling>
  );
};

export default TurbotNotificationLogsWithListPolling;
