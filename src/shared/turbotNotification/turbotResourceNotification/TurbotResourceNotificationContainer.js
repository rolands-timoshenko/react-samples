import React, { Component } from "react";
import PropTypes from "prop-types";
import QUERY from "./TurbotResourceNotification.query";
import TurbotEmptyNotification from "../turbotEmptyNotification/TurbotEmptyNotification";
import TurbotLoader from "../../turbotLoader/TurbotLoader";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import TurbotResourceDiff from "../turbotResourceDiff/TurbotResourceDiff";
import TurbotResourceJson from "../turbotResourceJson/TurbotResourceJson";
import TurbotResourceNotification from "./TurbotResourceNotification";
import TurbotResourceYaml from "../turbotResourceYaml/TurbotResourceYaml";
import { getVisibleMetadata } from "../../../utils/resources";
import { logColor, logIcon, LogType } from "../../../utils/logs";
import { NotificationTypes } from "./../../../utils/notifications";
import { Query } from "react-apollo";
import { withTheme } from "@material-ui/core/styles";

class TurbotResourceNotificationContainer extends Component {
  static propTypes = {
    notificationId: PropTypes.string.isRequired,
    processId: PropTypes.string,
    type: PropTypes.oneOf([
      NotificationTypes.RESOURCE_CREATED,
      NotificationTypes.RESOURCE_DELETED,
      NotificationTypes.RESOURCE_UPDATED
    ])
  };

  tabsMap = {
    [NotificationTypes.RESOURCE_UPDATED]: [
      { label: "YAML", value: 0 },
      { label: "JSON", value: 1 },
      { label: "Diff", value: 2 },
      { label: "Log", value: 3 }
    ],
    [NotificationTypes.RESOURCE_CREATED]: [
      { label: "YAML", value: 0 },
      { label: "JSON", value: 1 },
      { label: "Log", value: 2 }
    ],
    [NotificationTypes.RESOURCE_DELETED]: [
      { label: "YAML", value: 0 },
      { label: "JSON", value: 1 },
      { label: "Log", value: 2 }
    ]
  };

  get notificationType() {
    return this.props.type ? this.props.type : this.props.notification.type;
  }

  get notificationId() {
    return this.props.notificationId
      ? this.props.notificationId
      : this.props.notification.id;
  }

  get tabs() {
    const tabs = this.tabsMap[this.notificationType];
    return tabs ? tabs : [];
  }

  logColors = logColor(this.props.theme);

  filters = [
    {
      label: "Debug",
      value: "logLevel:>=debug",
      icon: logIcon[LogType.DEBUG],
      color: this.logColors[LogType.DEBUG]
    },
    {
      label: "Info",
      value: "logLevel:>=info",
      icon: logIcon[LogType.INFO],
      color: this.logColors[LogType.INFO]
    },
    {
      label: "Notice",
      value: "logLevel:>=warning#1",
      icon: logIcon[LogType.NOTICE],
      color: this.logColors[LogType.NOTICE]
    },
    {
      label: "Warning",
      value: "logLevel:>=warning#2",
      icon: logIcon[LogType.WARNING],
      color: this.logColors[LogType.WARNING]
    },
    {
      label: "Error",
      value: "logLevel:>=error",
      icon: logIcon[LogType.ERROR],
      color: this.logColors[LogType.ERROR]
    },
    {
      label: "Critical",
      value: "logLevel:>=critical",
      icon: logIcon[LogType.CRITICAL],
      color: this.logColors[LogType.CRITICAL]
    },
    {
      label: "Emergency",
      value: "logLevel:>=emergency",
      icon: logIcon[LogType.EMERGENCY],
      color: this.logColors[LogType.EMERGENCY]
    }
  ];

  get processId() {
    return this.props.processId;
  }

  get filter() {
    return this.state.selectedFilter.value.replace(/\#\d/gi, "");
  }

  get defaultTab() {
    if (this.notificationType === NotificationTypes.RESOURCE_UPDATED)
      return this.tabs.find(tab => tab.label === "Diff");
    return this.tabs.find(tab => tab.label === "YAML");
  }

  state = {
    selectedTab: this.defaultTab,
    selectedFilter: this.filters[1]
  };

  style = {
    maxHeight: 400,
    minHeight: 200,
    overflow: "auto",
    fontFamily: this.props.theme.typography.code.fontFamily,
    fontSize: this.props.theme.typography.body2.fontSize
  };

  handleTabSelect = (evt, value) => {
    this.setState({
      selectedTab: this.tabs.find(tab => tab.value === value)
    });
  };

  renderDIFF = data => {
    return (
      data.oldResource && (
        <TurbotResourceDiff
          style={this.style}
          current={getVisibleMetadata(data.resource.object)}
          previous={getVisibleMetadata(data.oldResource.object)}
        />
      )
    );
  };

  renderYAML = data => {
    return (
      <TurbotResourceYaml
        style={this.style}
        data={getVisibleMetadata(data.resource.object)}
      />
    );
  };

  renderJSON = data => {
    return (
      <TurbotResourceJson
        style={this.style}
        data={getVisibleMetadata(data.resource.object)}
      />
    );
  };

  renderLogs = () => {
    if (!this.processId) {
      return (
        <TurbotEmptyNotification
          logMessage="Missing process Id"
          logType="debug"
        />
      );
    }
    if (this.props.logsCmp)
      return React.cloneElement(this.props.logsCmp, {
        onFilterSelect: this.handleFilterSelect,
        filters: this.filters,
        filter: this.filter,
        processId: this.processId
      });
    return (
      <TurbotNotificationLogsWithListQuery
        onFilterSelect={this.handleFilterSelect}
        filters={this.filters}
        filter={this.filter}
        processId={this.processId}
      />
    );
  };

  renderList = data => {
    if (this.state.selectedTab.label === "YAML") return this.renderYAML(data);
    if (this.state.selectedTab.label === "JSON") return this.renderJSON(data);
    if (this.state.selectedTab.label === "Diff") return this.renderDIFF(data);
    if (this.state.selectedTab.label === "Log") return this.renderLogs();
  };

  renderLoader = () => {
    return (
      <div
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TurbotLoader />
      </div>
    );
  };

  handleFilterSelect = filter => {
    this.setState({
      selectedFilter: filter
    });
  };

  render() {
    const { selectedTab, selectedFilter } = this.state;
    return (
      <Query
        query={QUERY}
        variables={{
          id: this.notificationId
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return this.renderLoader();
          if (error) return `Error! ${error.message}`;
          return (
            <TurbotResourceNotification
              filters={this.filters}
              onSelectFilter={this.handleFilterSelect}
              onSelectTab={this.handleTabSelect}
              selectedTab={selectedTab}
              selectedFilter={selectedFilter}
              tabs={this.tabs}
              validProcessId={!!this.processId}
            >
              {this.renderList(data.data)}
            </TurbotResourceNotification>
          );
        }}
      </Query>
    );
  }
}

export default withTheme()(TurbotResourceNotificationContainer);
