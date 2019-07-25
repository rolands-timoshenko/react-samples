import React, { Component } from "react";
import PolicyValue from "../../../pages/policy/policyValue/PolicyValue";
import PropTypes from "prop-types";
import QUERY from "./TurbotPolicyValueNotification.query";
import TurbotPolicyValueNotification from "./TurbotPolicyValueNotification";
import TurbotEmptyNotification from "../turbotEmptyNotification/TurbotEmptyNotification";
import TurbotLoader from "../../turbotLoader/TurbotLoader";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import TurbotResourceDiff from "../turbotResourceDiff/TurbotResourceDiff";
import withTheme from "@material-ui/core/styles/withTheme";
import { logColor, logIcon, LogType } from "../../../utils/logs";
import { NotificationTypes } from "./../../../utils/notifications";
import { Query } from "react-apollo";
import { TypeTurbotNotification } from "../TurbotNotification";

class TurbotPolicyValueNotificationContainer extends Component {
  static propTypes = {
    processId: PropTypes.string,
    notification: TypeTurbotNotification,
    type: PropTypes.oneOf([
      NotificationTypes.POLICY_VALUE_CREATED,
      NotificationTypes.POLICY_VALUE_UPDATED,
      NotificationTypes.POLICY_VALUE_DELETED
    ])
  };

  tabsMap = {
    [NotificationTypes.POLICY_VALUE_UPDATED]: [
      { label: "Value", value: 0 },
      { label: "Diff", value: 1 },
      { label: "Log", value: 2 }
    ],
    [NotificationTypes.POLICY_VALUE_CREATED]: [
      { label: "Value", value: 0 },
      { label: "Log", value: 1 }
    ],
    [NotificationTypes.POLICY_VALUE_DELETED]: [
      { label: "Value", value: 0 },
      { label: "Log", value: 1 }
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
    if (this.notificationType === NotificationTypes.POLICY_VALUE_UPDATED)
      return this.tabs.find(tab => tab.label === "Diff");
    else if (this.notificationType === NotificationTypes.POLICY_VALUE_CREATED)
      return this.tabs.find(tab => tab.label === "Value");
    else return this.tabs.find(tab => tab.label === "Value");
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

  renderDIFF = (policyValue, oldPolicyValue) => {
    const currentValue = {
      value: policyValue.value,
      precedence: policyValue.precedence
    };
    const previousValue = {
      value: oldPolicyValue.value,
      precedence: oldPolicyValue.precedence
    };
    if (policyValue.isCalculated) {
      currentValue.state = policyValue.state;
    }
    if (oldPolicyValue.isCalculated) {
      previousValue.state = oldPolicyValue.state;
    }
    return (
      oldPolicyValue && (
        <TurbotResourceDiff
          style={this.style}
          current={currentValue}
          previous={previousValue}
        />
      )
    );
  };

  renderValue = data => {
    return data.policyValue.setting ? (
      <div style={{ padding: "1.2rem 0 2rem 1.1rem" }}>
        <PolicyValue
          style={{ margin: 0 }}
          tabSize="small"
          policyType={data.policyValue.type}
          value={data.policyValue}
        />
      </div>
    ) : null;
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
    if (this.state.selectedTab.label === "Value") return this.renderValue(data);

    if (this.state.selectedTab.label === "Diff")
      return this.renderDIFF(data.policyValue, data.oldPolicyValue);

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
            <TurbotPolicyValueNotification
              tabs={this.tabs}
              list={this.list}
              validProcessId={!!this.processId}
              filters={this.filters}
              selectedTab={selectedTab}
              selectedFilter={selectedFilter}
              onSelectFilter={this.handleFilterSelect}
              onSelectTab={this.handleTabSelect}
            >
              {this.renderList(data.data)}
            </TurbotPolicyValueNotification>
          );
        }}
      </Query>
    );
  }
}

export default withTheme()(TurbotPolicyValueNotificationContainer);
