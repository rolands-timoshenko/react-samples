import gql from "graphql-tag";

export const AwsPermissionModeQuery = gql`
  query AwsPermissionModePolicyValue($resourceId: String) {
    policyValue(uri: "", resourceId: $resourceId) {
      value
    }
  }
`;
