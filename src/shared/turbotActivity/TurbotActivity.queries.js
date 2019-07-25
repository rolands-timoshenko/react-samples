import gql from "graphql-tag";
import notificationFragments from "../graphql/fragments/notificationFragments";
import permissionFragments from "../graphql/fragments/permissionFragments";
import resourceFragments from "../graphql/fragments/resourceFragments";

export const fragments = {
  notifyData: gql`
    fragment NotifyData on notification {
      data
      icon
      message
    }
  `,
  resource: gql`
    fragment Resource on notification {
      resource {
        turbot {
          ...turbotResourceMetadata
        }
        ...resourceTrunk
        type {
          ...resourceTypeTrunk
          turbot {
            ...turbotResourceTypeMetadata
          }
        }
      }
      oldResource {
        turbot {
          ...turbotResourceMetadata
        }
        ...resourceTrunk
        type {
          ...resourceTypeTrunk
          turbot {
            ...turbotResourceTypeMetadata
          }
        }
      }
    }
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.resourceTypeTrunk}
    ${resourceFragments.turbotResourceMetadata}
    ${resourceFragments.turbotResourceTypeMetadata}
  `,
  control: gql`
    fragment Control on notification {
      control {
        reason
        state
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          ...controlTypeTrunk
          turbot {
            ...turbotControlTypeMetadata
          }
        }
      }
      oldControl {
        reason
        state
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          ...controlTypeTrunk
          turbot {
            ...turbotControlTypeMetadata
          }
        }
      }
    }
    ${resourceFragments.controlTypeTrunk}
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.turbotControlTypeMetadata}
    ${resourceFragments.turbotResourceMetadata}
  `,
  grant: gql`
    fragment Grant on notification {
      grant {
        turbot {
          id
        }
        identity {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        level {
          turbot {
            ...turbotPermissionMetadata
          }
        }
        type {
          ...permissionTypeTrunk
        }
      }
      oldGrant {
        turbot {
          id
        }
        identity {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        level {
          turbot {
            ...turbotPermissionMetadata
          }
        }
        type {
          ...permissionTypeTrunk
        }
      }
    }
    ${permissionFragments.permissionTypeTrunk}
    ${permissionFragments.turbotPermissionMetadata}
    ${resourceFragments.controlTypeTrunk}
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.turbotResourceMetadata}
  `,
  activeGrant: gql`
    fragment ActiveGrant on notification {
      activeGrant {
        turbot {
          id
        }
        grant {
          turbot {
            id
          }
          identity {
            turbot {
              ...turbotResourceMetadata
            }
            ...resourceTrunk
          }
          resource {
            turbot {
              ...turbotResourceMetadata
            }
            ...resourceTrunk
          }
          level {
            turbot {
              ...turbotPermissionMetadata
            }
          }
          type {
            ...permissionTypeTrunk
          }
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
      }
      oldActiveGrant {
        turbot {
          id
        }
        grant {
          turbot {
            id
          }
          identity {
            turbot {
              ...turbotResourceMetadata
            }
            ...resourceTrunk
          }
          resource {
            turbot {
              ...turbotResourceMetadata
            }
            ...resourceTrunk
          }
          level {
            turbot {
              ...turbotPermissionMetadata
            }
          }
          type {
            ...permissionTypeTrunk
          }
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
      }
    }
    ${permissionFragments.permissionTypeTrunk}
    ${permissionFragments.turbotPermissionMetadata}
    ${resourceFragments.controlTypeTrunk}
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.turbotResourceMetadata}
  `,
  policyValue: gql`
    fragment PolicyValue on notification {
      policyValue {
        value
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          schema
          secret
          turbot {
            ...turbotPolicyTypeMetadata
          }
          ...policyTypeTrunk
        }
      }
      oldPolicyValue {
        value
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          schema
          secret
          turbot {
            ...turbotPolicyTypeMetadata
          }
          ...policyTypeTrunk
        }
      }
    }
    ${resourceFragments.policyTypeTrunk}
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.turbotPolicyTypeMetadata}
    ${resourceFragments.turbotResourceMetadata}
  `,
  policySetting: gql`
    fragment PolicySetting on notification {
      policySetting {
        value
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          turbot {
            ...turbotPolicyTypeMetadata
          }
          schema
          secret
          ...policyTypeTrunk
        }
      }
      oldPolicySetting {
        value
        turbot {
          id
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
          ...resourceTrunk
        }
        type {
          turbot {
            ...turbotPolicyTypeMetadata
          }
          secret
          schema
          ...policyTypeTrunk
        }
      }
    }
    ${resourceFragments.policyTypeTrunk}
    ${resourceFragments.resourceTrunk}
    ${resourceFragments.turbotPolicyTypeMetadata}
    ${resourceFragments.turbotResourceMetadata}
  `
};

const QUERY = gql`
  query TurbotNotificationList($filter: [String!], $paging: String) {
    data: notificationList(filter: $filter, paging: $paging) {
      paging {
        next
      }
      metadata {
        stats {
          total
        }
      }
      items {
        notificationType
        ...NotifyData
        ...Control
        ...ActiveGrant
        ...Grant
        ...Resource
        ...PolicyValue
        ...PolicySetting
        ...Actor
        turbot {
          createTimestamp
          id
          processId
        }
      }
    }
  }
  ${fragments.notifyData}
  ${fragments.resource}
  ${fragments.control}
  ${fragments.grant}
  ${fragments.activeGrant}
  ${fragments.policyValue}
  ${fragments.policySetting}
  ${notificationFragments.actor}
`;
export default QUERY;
