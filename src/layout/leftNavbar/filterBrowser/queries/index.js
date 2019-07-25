import gql from "graphql-tag";
import resourceFragments from "../../../../shared/graphql/fragments/resourceFragments";

export default {
  controlCategory: {
    item: gql`
      query BrowseControlCategory($id: String!) {
        item: controlCategory(id: $id) {
          icon
          ...controlCategoryTrunk
          turbot {
            ...turbotControlCategoryMetadata
          }
        }
      }
      ${resourceFragments.controlCategoryTrunk}
      ${resourceFragments.turbotControlCategoryMetadata}
    `
  },
  controlType: {
    item: gql`
      query BrowseControlType($id: String!) {
        item: controlType(id: $id) {
          icon
          ...controlTypeTrunk
          turbot {
            ...turbotControlTypeMetadata
          }
        }
      }
      ${resourceFragments.controlTypeTrunk}
      ${resourceFragments.turbotControlTypeMetadata}
    `
  },
  policyType: {
    item: gql`
      query BrowsePolicyType($id: String!) {
        item: policyType(id: $id) {
          icon
          schema
          secret
          uri
          ...policyTypeTrunk
          turbot {
            ...turbotPolicyTypeMetadata
          }
        }
      }
      ${resourceFragments.policyTypeTrunk}
      ${resourceFragments.turbotPolicyTypeMetadata}
    `
  },
  resource: {
    root: gql`
      query RootResource {
        rootResource: resourceList(filter: "level:self  limit:1") {
          items {
            object
            ...resourceTrunk
            turbot {
              ...turbotResourceMetadata
            }
            type {
              icon
              uri
            }
          }
        }
      }
      ${resourceFragments.resourceTrunk}
      ${resourceFragments.turbotResourceMetadata}
    `,
    item: gql`
      query BrowseResource($id: String!) {
        item: resource(id: $id) {
          object
          ...resourceTrunk
          turbot {
            ...turbotResourceMetadata
          }
          type {
            icon
            uri
            turbot {
              ...turbotResourceTypeMetadata
            }
          }
        }
      }
      ${resourceFragments.resourceTrunk}
      ${resourceFragments.turbotResourceMetadata}
      ${resourceFragments.turbotResourceTypeMetadata}
    `
  },
  resourceCategory: {
    item: gql`
      query BrowseResourceCategory($id: String!) {
        item: resourceCategory(id: $id) {
          icon
          ...resourceCategoryTrunk
          turbot {
            ...turbotResourceCategoryMetadata
          }
        }
      }
      ${resourceFragments.resourceCategoryTrunk}
      ${resourceFragments.turbotResourceCategoryMetadata}
    `
  },
  resourceType: {
    item: gql`
      query BrowseResourceType($id: String!) {
        item: resourceType(id: $id) {
          icon
          ...resourceTypeTrunk
          turbot {
            ...turbotResourceTypeMetadata
          }
        }
      }
      ${resourceFragments.resourceTypeTrunk}
      ${resourceFragments.turbotResourceTypeMetadata}
    `
  }
};
