import gql from "graphql-tag";
import resourceFragments from "../../../../../shared/graphql/fragments/resourceFragments";

export default {
  controlCategory: {
    ancestors: gql`
      query ControlCategoryAncestors($filter: [String!]) {
        list: controlCategoryList(filter: $filter) {
          items {
            icon
            turbot {
              ...turbotControlCategoryMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotControlCategoryMetadata}
    `,
    children: gql`
      query ControlCategoryChildren($filter: [String!], $paging: String) {
        list: controlCategoryList(filter: $filter, paging: $paging) {
          items {
            icon
            turbot {
              ...turbotControlCategoryMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotControlCategoryMetadata}
    `
  },
  controlType: {
    ancestors: gql`
      query ControlTypeAncestors($filter: [String!]) {
        list: controlTypeList(filter: $filter) {
          items {
            icon
            turbot {
              ...turbotControlTypeMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotControlTypeMetadata}
    `,
    children: gql`
      query ControlTypeChildren($filter: [String!], $paging: String) {
        list: controlTypeList(filter: $filter, paging: $paging) {
          items {
            icon
            turbot {
              ...turbotControlTypeMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotControlTypeMetadata}
    `
  },
  policyType: {
    ancestors: gql`
      query PolicyTypeAncestors($filter: [String!]) {
        list: policyTypeList(filter: $filter) {
          items {
            icon
            schema
            turbot {
              ...turbotPolicyTypeMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotPolicyTypeMetadata}
    `,
    children: gql`
      query PolicyTypeChildren($filter: [String!], $paging: String) {
        list: policyTypeList(filter: $filter, paging: $paging) {
          items {
            icon
            schema
            turbot {
              ...turbotPolicyTypeMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotPolicyTypeMetadata}
    `
  },
  resource: {
    ancestors: gql`
      query ResourceAncestors($filter: [String!]) {
        list: resourceList(filter: $filter) {
          items {
            type {
              icon
              turbot {
                ...turbotResourceTypeMetadata
              }
            }
            turbot {
              ...turbotResourceMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotResourceMetadata}
      ${resourceFragments.turbotResourceTypeMetadata}
    `,
    children: gql`
      query ResourceChildren($filter: [String!], $paging: String) {
        list: resourceList(filter: $filter, paging: $paging) {
          items {
            type {
              icon
              turbot {
                ...turbotResourceTypeMetadata
              }
            }
            turbot {
              ...turbotResourceMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotResourceMetadata}
      ${resourceFragments.turbotResourceTypeMetadata}
    `,
    childrenNavNodes: gql`
      query ResourceChildren($filter: [String!], $paging: String) {
        list: resourceWithNavigationList(filter: $filter, paging: $paging) {
          items {
            ... on resource {
              type {
                icon
                turbot {
                  ...turbotResourceTypeMetadata
                }
              }
              turbot {
                ...turbotResourceMetadata
              }
            }
            ... on resourceNavigationNode {
              resourceCount
              turbot {
                navigationNodeId
              }
              type {
                icon
                ...resourceTypeTrunk
                turbot {
                  ...turbotResourceTypeMetadata
                }
              }
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.resourceTypeTrunk}
      ${resourceFragments.turbotResourceMetadata}
      ${resourceFragments.turbotResourceTypeMetadata}
    `
  },
  resourceCategory: {
    ancestors: gql`
      query ResourceCategoryAncestors($filter: [String!]) {
        list: resourceCategoryList(filter: $filter) {
          items {
            icon
            turbot {
              ...turbotResourceCategoryMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotResourceCategoryMetadata}
    `,
    children: gql`
      query ResourceCategoryChildren($filter: [String!], $paging: String) {
        list: resourceCategoryList(filter: $filter, paging: $paging) {
          items {
            icon
            turbot {
              ...turbotResourceCategoryMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotResourceCategoryMetadata}
    `
  },
  resourceType: {
    ancestors: gql`
      query ResourceTypeAncestors($filter: [String!]) {
        list: resourceTypeList(filter: $filter) {
          items {
            icon
            turbot {
              ...turbotResourceTypeMetadata
            }
          }
        }
      }
      ${resourceFragments.turbotResourceTypeMetadata}
    `,
    children: gql`
      query ResourceTypeChildren($filter: [String!], $paging: String) {
        list: resourceTypeList(filter: $filter, paging: $paging) {
          items {
            icon
            turbot {
              ...turbotResourceTypeMetadata
            }
          }
          paging {
            next
          }
        }
      }
      ${resourceFragments.turbotResourceTypeMetadata}
    `
  }
};
