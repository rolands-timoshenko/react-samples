import gql from "graphql-tag";
import resourceFragments from "../../../graphql/fragments/resourceFragments";

export default gql`
  query ActiveGrantActivityListActionQuery($id: String!) {
    activeGrant(id: $id) {
      identity {
        title
        ...resourceTrunk
        type {
          ...resourceTypeTrunk
          category {
            ...resourceCategoryTrunk
          }
        }
      }
      resource {
        title
        ...resourceTrunk
        type {
          ...resourceTypeTrunk
          category {
            ...resourceCategoryTrunk
          }
        }
      }
    }
  }
  ${resourceFragments.resourceCategoryTrunk}
  ${resourceFragments.resourceTrunk}
  ${resourceFragments.resourceTypeTrunk}
  ${resourceFragments.turbotResourceMetadata}
`;
