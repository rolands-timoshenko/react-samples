import gql from "graphql-tag";

const QUERY = gql`
  query ResourceNotification($id: String!) {
    data: notification(id: $id) {
      resource {
        object
      }
      oldResource {
        object
      }
    }
  }
`;
export default QUERY;
