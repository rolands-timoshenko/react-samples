import gql from "graphql-tag";
import permissionFragments from "../graphql/fragments/permissionFragments";
import resourceFragments from "../graphql/fragments/resourceFragments";

export default gql`
  query CloudProviderLoginPermissions(
    $filter: [String!]
    $activeGrantsFilter: [String!]
  ) {
    cloudResources: resourceList(filter: $filter) {
      items {
        object
        type {
          uri
        }
        awsPermissionsMode: policyValue(uri: "") {
          value
        }
      }
    }
    activeGrantList(filter: $activeGrantsFilter) {
      items {
        resource {
          turbot {
            ...turbotResourceMetadata
          }
        }
        grant {
          type {
            uri
            ...permissionTypeTrunk
          }
          level {
            uri
            turbot {
              ...turbotPermissionMetadata
            }
          }
          roleName
        }
      }
    }
  }
  ${permissionFragments.permissionTypeTrunk}
  ${permissionFragments.turbotPermissionMetadata}
  ${resourceFragments.turbotResourceMetadata}
`;
