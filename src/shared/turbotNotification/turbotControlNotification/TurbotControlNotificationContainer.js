import PropTypes from "prop-types";
import React, { Component } from "react";
import TurbotControlNotification from "./TurbotControlNotification";
import { logIcon, logColor, LogType } from "../../../utils/logs";
import { withTheme } from "@material-ui/core/styles";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import TurbotEmptyNotification from "../turbotEmptyNotification/TurbotEmptyNotification";

class TurbotControlNotificationContainer extends Component {
  static propTypes = {
    // FIXME: change it to processId only
    notification: PropTypes.any,
    processId: PropTypes.string,
    logsCmp: PropTypes.element
  };

  logColors = logColor(this.props.theme);

  tabs = [{ label: "Log", value: 1 }];

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
    return this.props.processId
      ? this.props.processId
      : this.props.notification && this.props.notification.processId;
  }

  get filter() {
    return this.state.selectedFilter.value.replace(/\#\d/gi, "");
  }

  state = {
    selectedTab: this.tabs[0],
    selectedFilter: this.filters[1]
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

  // TODO: return will be added
  renderInput = () => {
    return null;
  };

  // TODO: return will be added
  renderData = () => {
    return null;
  };

  renderList = () => {
    if (this.state.selectedTab.value === 0) return this.renderInput();
    if (this.state.selectedTab.value === 1) return this.renderLogs();
    if (this.state.selectedTab.value === 2) return this.renderData();
  };

  handleFilterSelect = filter => {
    this.setState({
      selectedFilter: filter
    });
  };

  handleTabSelect = (evt, value) => {
    this.setState({
      selectedTab: this.tabs.find(tab => tab.value === value)
    });
  };

  render() {
    const { selectedTab, selectedFilter } = this.state;
    return (
      <TurbotControlNotification
        tabs={this.tabs}
        list={this.list}
        validProcessId={!!this.processId}
        filters={this.filters}
        selectedTab={selectedTab}
        selectedFilter={selectedFilter}
        onSelectFilter={this.handleFilterSelect}
        onSelectTab={this.handleTabSelect}
      >
        {this.renderList()}
      </TurbotControlNotification>
    );
  }
}

export default withTheme()(TurbotControlNotificationContainer);
