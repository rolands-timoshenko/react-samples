import gql from "graphql-tag";

export const NAVIGATION_TABS_SUMMARY = gql`
  query ResourceSummary(
    $activityFilter: [String!]
    $controlAlarmsFilter: [String!]
    $filter: [String!]
    $policySettingOrphansFilter: [String!]
  ) {
    activityCount: notificationList(filter: $activityFilter) {
      metadata {
        stats {
          total
        }
      }
    }
    resourcesCount: resourceList(filter: $filter) {
      metadata {
        stats {
          total
        }
      }
    }
    controlsCount: controlList(filter: $filter) {
      metadata {
        stats {
          total
        }
      }
    }
    controlsAlertCount: controlList(filter: $controlAlarmsFilter) {
      metadata {
        stats {
          total
        }
      }
    }
    policySettingsCount: policySettingList(filter: $filter) {
      metadata {
        stats {
          total
        }
      }
    }
    policySettingOrphansCount: policySettingList(
      filter: $policySettingOrphansFilter
    ) {
      metadata {
        stats {
          total
        }
      }
    }
    permissionsCount: activeGrantList(filter: $filter) {
      metadata {
        stats {
          total
        }
      }
    }
  }
`;
