import gql from "graphql-tag";
import resourceFragments from "../../../graphql/fragments/resourceFragments";

export default gql`
  query GrantActivityListActionQuery($id: String!) {
    grant(id: $id) {
      identity {
        ...resourceTrunk
        type {
          ...resourceTypeTrunk
          category {
            ...resourceCategoryTrunk
          }
        }
      }
      resource {
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
`;
