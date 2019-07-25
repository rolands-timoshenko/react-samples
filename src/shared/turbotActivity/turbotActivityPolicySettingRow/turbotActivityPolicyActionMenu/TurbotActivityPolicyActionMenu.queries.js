import gql from "graphql-tag";
import resourceFragments from "../../../graphql/fragments/resourceFragments";

export default gql`
  query PolicyListItemMenuQuery($policyTypeId: String!, $resourceId: String!) {
    policyType(id: $policyTypeId) {
      uri
      turbot {
        id
      }
      ...policyTypeTrunk
      category {
        ...controlCategoryTrunk
      }
    }
    resource(id: $resourceId) {
      turbot {
        ...turbotResourceMetadata
      }
      ...resourceTrunk
      type {
        ...resourceTypeTrunk
        category {
          ...resourceCategoryTrunk
        }
      }
    }
  }
  ${resourceFragments.controlCategoryTrunk}
  ${resourceFragments.policyTypeTrunk}
  ${resourceFragments.resourceCategoryTrunk}
  ${resourceFragments.resourceTrunk}
  ${resourceFragments.resourceTypeTrunk}
  ${resourceFragments.turbotResourceMetadata}
`;
