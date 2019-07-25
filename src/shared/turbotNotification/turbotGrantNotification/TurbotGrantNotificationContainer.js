import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotEmptyNotification from "../turbotEmptyNotification/TurbotEmptyNotification";
import TurbotGrantNotification from "./TurbotGrantNotification";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import { logColor, logIcon, LogType } from "../../../utils/logs";
import { NotificationTypes } from "../../../utils/notifications";
import { withTheme } from "@material-ui/core/styles";

class TurbotGrantNotificationContainer extends Component {
  static propTypes = {
    notificationId: PropTypes.string.isRequired,
    processId: PropTypes.string,
    type: PropTypes.oneOf([
      NotificationTypes.GRANT_CREATED,
      NotificationTypes.GRANT_UPDATED,
      NotificationTypes.GRANT_DELETED
    ])
  };

  tabsMap = {
    [NotificationTypes.GRANT_CREATED]: [{ label: "Log", value: 0 }],
    [NotificationTypes.GRANT_UPDATED]: [{ label: "Log", value: 0 }],
    [NotificationTypes.GRANT_DELETED]: [{ label: "Log", value: 0 }]
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
    return this.tabs.find(tab => tab.label === "Log");
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

  renderList = () => {
    if (this.state.selectedTab.label === "Log") return this.renderLogs();
  };

  handleFilterSelect = filter => {
    this.setState({
      selectedFilter: filter
    });
  };

  render() {
    const { selectedTab, selectedFilter } = this.state;
    return (
      <TurbotGrantNotification
        filters={this.filters}
        onSelectFilter={this.handleFilterSelect}
        onSelectTab={this.handleTabSelect}
        selectedTab={selectedTab}
        selectedFilter={selectedFilter}
        tabs={this.tabs}
        validProcessId={!!this.processId}
      >
        {this.renderList()}
      </TurbotGrantNotification>
    );
  }
}

export default withTheme()(TurbotGrantNotificationContainer);
