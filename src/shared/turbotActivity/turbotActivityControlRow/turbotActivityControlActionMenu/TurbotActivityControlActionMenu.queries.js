import gql from "graphql-tag";
import resourceFragments from "../../../graphql/fragments/resourceFragments";

export default gql`
  query ControlActivityListActionQuery($id: String!) {
    control(id: $id) {
      turbot {
        id
      }
      type {
        ...controlTypeTrunk
        category {
          ...controlCategoryTrunk
        }
      }
      resource {
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
  }
  ${resourceFragments.controlCategoryTrunk}
  ${resourceFragments.controlTypeTrunk}
  ${resourceFragments.resourceCategoryTrunk}
  ${resourceFragments.resourceTrunk}
  ${resourceFragments.resourceTypeTrunk}
  ${resourceFragments.turbotResourceMetadata}
`;
