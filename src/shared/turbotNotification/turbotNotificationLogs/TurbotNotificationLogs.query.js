import gql from "graphql-tag";

const QUERY = gql`
  query NotificationProcessLogs($filter: [String!], $paging: String) {
    processLogList(filter: $filter, paging: $paging) {
      items {
        level
        message
        data
        turbot {
          createTimestamp
        }
      }
      paging {
        next
      }
    }
  }
`;

export default QUERY;
