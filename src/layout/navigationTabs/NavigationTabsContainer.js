import React, { Component } from "react";
import NavigationTabs from "./NavigationTabs";
import withFilter from "../../hoc/withFilter";
import withClient from "../../hoc/withClient";
import withBackoff from "../../hoc/withBackoff";
import NavbarTabUrlGenerator from "../../shared/navbarTabUrlGenerator/NavbarTabUrlGenerator";
import TurbotErrorHandlerProvider from "../../shared/turbotErrorHandler/TurbotErrorHandlerProvider";
import withTurbotErrorHandlerProvider from "../../shared/turbotErrorHandler/withTurbotErrorHandlerProvider";
import withTurbotErrorHandlerConsumer from "../../shared/turbotErrorHandler/withTurbotErrorHandlerConsumer";
import { compose } from "react-apollo";
import { getListMetadataStatsTotal } from "../../utils/list";
import { NAVIGATION_TABS_SUMMARY } from "./NavigationTabs.queries";
import { UI_URLS } from "../../config/urls";
import { withRouter } from "react-router-dom";
import { withTheme } from "@material-ui/core";

class NavigationTabsContainer extends Component {
  state = {
    resourceSummary: null,
    showSpinner: false
  };
  timeoutId = null;

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.scopeFilter !== this.props.scopeFilter ||
      nextState.resourceSummary !== this.state.resourceSummary ||
      nextState.showSpinner !== this.state.showSpinner ||
      nextProps.match.url !== this.props.match.url
    );
  }

  componentDidMount() {
    this.loadResourceSummary(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.scopeFilter !== prevProps.scopeFilter) {
      this.setState({ resourceSummary: null }, () =>
        this.loadResourceSummary(true)
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  loadResourceSummary = async reload => {
    this.timeoutId && clearTimeout(this.timeoutId);
    const showSpinner = !this.state.resourceSummary;
    this.setState({ showSpinner }, async () => {
      try {
        const variables = {
          activityFilter: `${this.props.scopeFilter} createTimestamp:>T-1h notificationType:resource,policySetting,control`,
          filter: `${this.props.scopeFilter} limit:0`,
          controlAlarmsFilter: `${this.props.scopeFilter} state:alarm,error limit:0`,
          policySettingOrphansFilter: `${this.props.scopeFilter} is:orphan limit:0`
        };
        const { data } = await this.props.client.query({
          query: NAVIGATION_TABS_SUMMARY,
          variables
        });
        if (this.props.interval && reload) {
          this.timeoutId = setTimeout(() => {
            this.loadResourceSummary(true);
            this.props.genNextInterval();
          }, this.props.interval);
        }
        if (data) {
          this.setState({
            showSpinner: false,
            resourceSummary: data
          });
        }
      } catch (error) {
        this.setState({
          resourceSummary: null,
          showSpinner: false
        });
      }
    });
  };

  getBadgeCount(resourceSummary, key) {
    if (!resourceSummary) {
      return null;
    }
    let count =
      (resourceSummary[key] && resourceSummary[key].metadata.stats.total) || 0;
    return count;
  }

  getBadgeInfo(resourceSummary, key, isAlert = false) {
    if (!resourceSummary) {
      return null;
    }
    let count = this.getBadgeCount(resourceSummary, key);
    if (count === 0 && isAlert) {
      return null;
    }
    return {
      count
    };
  }

  getMetadataTotal(resourceSummary, key) {
    if (!resourceSummary) {
      return null;
    }
    if (!resourceSummary[key]) {
      return null;
    }
    const summaryItem = resourceSummary[key];
    return getListMetadataStatsTotal(summaryItem.metadata);
  }

  getIcon(resourceSummary, key) {
    switch (key) {
      case "activity":
        const activityCount = this.getMetadataTotal(
          resourceSummary,
          "activityCount"
        );
        if (activityCount > 0) {
          return {
            class: "fas",
            icon: "arrow-circle-up",
            color: this.props.theme.palette.notification.updated
          };
        } else {
          return { class: "fal", icon: "arrow-circle-up" };
        }
      case "overview":
        return { class: "fal", icon: "tachometer" };
      case "resources":
        return { class: "fal", icon: "cube" };
      case "controls":
        const controlsAlerts = this.getMetadataTotal(
          resourceSummary,
          "controlsAlertCount"
        );
        if (controlsAlerts > 0) {
          return {
            class: "fas",
            icon: "shield-alt",
            color: this.props.theme.palette.error.dark
          };
        }
        const controls = this.getMetadataTotal(
          resourceSummary,
          "controlsCount"
        );
        if (controls > 0) {
          return {
            class: "fas",
            icon: "shield-check",
            color: this.props.theme.palette.green
          };
        } else {
          return { class: "fal", icon: "shield-check" };
        }
      case "permissions":
        const permissionsAlerts = this.getMetadataTotal(
          resourceSummary,
          "permissionsAlertCount"
        );
        if (permissionsAlerts > 0) {
          return {
            class: "fas",
            icon: "user-crown",
            color: this.props.theme.palette.error.dark
          };
        }
        const permissions = this.getMetadataTotal(
          resourceSummary,
          "permissionsCount"
        );
        if (permissions > 0) {
          return {
            class: "fas",
            icon: "user-crown",
            color: this.props.theme.palette.green
          };
        } else {
          return { class: "fal", icon: "user-crown" };
        }
      case "policies":
        const policyOrphans = this.getMetadataTotal(
          resourceSummary,
          "policySettingOrphansCount"
        );
        if (policyOrphans > 0) {
          return {
            class: "fas",
            icon: "wrench",
            color: this.props.theme.palette.error.dark
          };
        } else {
          return { class: "fal", icon: "wrench" };
        }
      case "reports":
        return { class: "fal", icon: "clipboard-list" };
      default: {
        return null;
      }
    }
  }

  tabs(resourceSummary, error) {
    return [
      {
        label: "Overview",
        icon: this.getIcon(resourceSummary, "overview"),
        selected: url => url === UI_URLS.OVERVIEW,
        value: UI_URLS.OVERVIEW
      },
      {
        label: "Activity",
        icon: this.getIcon(resourceSummary, "activity"),
        selected: url => url === UI_URLS.ACTIVITY,
        value: UI_URLS.ACTIVITY
      },
      // {
      //   label: "Reports",
      //   icon: this.getIcon(resourceSummary, "reports"),
      //   value: UI_URLS.REPORTS,
      //   badges: {
      //     total: this.getBadgeInfo(resourceSummary, "reportsCount")
      //   }
      // }
      {
        label: "Controls",
        icon: this.getIcon(resourceSummary, "controls"),
        selected: url => url === UI_URLS.CONTROLS,
        value: UI_URLS.CONTROLS,
        ...(!error && {
          badges: {
            total: this.getBadgeInfo(resourceSummary, "controlsCount", false),
            alerts: this.getBadgeInfo(
              resourceSummary,
              "controlsAlertCount",
              true
            )
          }
        })
      },
      {
        label: "Policies",
        icon: this.getIcon(resourceSummary, "policies"),
        selected: url => url === UI_URLS.POLICIES,
        value: UI_URLS.POLICIES,
        ...(!error && {
          badges: {
            total: this.getBadgeInfo(
              resourceSummary,
              "policySettingsCount",
              false
            ),
            alerts: this.getBadgeInfo(
              resourceSummary,
              "policySettingOrphansCount",
              true
            )
          }
        })
      },
      {
        label: "Resources",
        icon: this.getIcon(resourceSummary, "resources"),
        selected: url =>
          url === UI_URLS.RESOURCES || url === UI_URLS.SMART_FOLDERS,
        value: UI_URLS.RESOURCES,
        ...(!error && {
          badges: {
            total: this.getBadgeInfo(resourceSummary, "resourcesCount")
          }
        })
      },
      {
        label: "Permissions",
        icon: this.getIcon(resourceSummary, "permissions"),
        selected: url =>
          url === UI_URLS.PERMISSIONS || url === UI_URLS.DIRECTORIES,
        value: UI_URLS.PERMISSIONS,
        ...(!error && {
          badges: {
            total: this.getBadgeInfo(resourceSummary, "permissionsCount", false)
          }
        })
      }
    ];
  }

  get selectedTab() {
    return this.props.match.url;
  }

  render() {
    return (
      <TurbotErrorHandlerProvider>
        <NavbarTabUrlGenerator>
          <NavigationTabs
            selectedTab={this.selectedTab}
            tabs={this.tabs(this.state.resourceSummary)}
            spinner={this.state.showSpinner}
          />
        </NavbarTabUrlGenerator>
      </TurbotErrorHandlerProvider>
    );
  }
}

const enhance = compose(
  withTurbotErrorHandlerProvider(null),
  withBackoff,
  withClient,
  withFilter,
  withRouter,
  withTheme(),
  withTurbotErrorHandlerConsumer
);

export default enhance(NavigationTabsContainer);
