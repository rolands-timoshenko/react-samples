import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import TurbotNotifyNotification from "./TurbotNotifyNotification";
import TurbotResourceYaml from "../turbotResourceYaml/TurbotResourceYaml";
import { logIcon, logColor, LogType } from "../../../utils/logs";
import { withTheme } from "@material-ui/core/styles";

class TurbotNotifyNotificationContainer extends Component {
  static propTypes = {
    // FIXME: change it to processId only
    notification: PropTypes.any,
    processId: PropTypes.string,
    logsCmp: PropTypes.element
  };

  logColors = logColor(this.props.theme);

  tabs = [{ label: "Data", value: 0 }, { label: "Log", value: 1 }];

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
      : this.props.notification.processId;
  }

  get filter() {
    return this.state.selectedFilter.value.replace(/\#\d/gi, "");
  }

  state = {
    selectedTab: this.tabs[0],
    selectedFilter: this.filters[1]
  };

  style = {
    maxHeight: 400,
    minHeight: 200,
    overflow: "auto"
  };

  renderLogs = () => {
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

  renderData = () => {
    return (
      <TurbotResourceYaml
        style={this.style}
        data={this.props.notification.data}
      />
    );
  };

  renderList = () => {
    if (this.state.selectedTab.value === 0) return this.renderData();
    if (this.state.selectedTab.value === 1) return this.renderLogs();
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
      <TurbotNotifyNotification
        tabs={this.tabs}
        list={this.list}
        filters={this.filters}
        selectedTab={selectedTab}
        selectedFilter={selectedFilter}
        onSelectFilter={this.handleFilterSelect}
        onSelectTab={this.handleTabSelect}
      >
        {this.renderList()}
      </TurbotNotifyNotification>
    );
  }
}

export default withTheme()(TurbotNotifyNotificationContainer);
