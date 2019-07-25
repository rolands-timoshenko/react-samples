import gql from "graphql-tag";
import resourceFragments from "../../../graphql/fragments/resourceFragments";

export default gql`
  query ResourceActivityListActionQuery($id: String!) {
    resource(id: $id) {
      ...resourceTrunk
      type {
        ...resourceTypeTrunk
        category {
          ...resourceCategoryTrunk
        }
      }
      turbot {
        ...turbotResourceMetadata
      }
    }
  }
  ${resourceFragments.resourceCategoryTrunk}
  ${resourceFragments.resourceTrunk}
  ${resourceFragments.resourceTypeTrunk}
  ${resourceFragments.turbotResourceMetadata}
`;
