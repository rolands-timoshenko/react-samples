import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withTheme } from "@material-ui/core/styles";
import { TypeTurbotNotification } from "../TurbotNotification";
import TurbotResourceDiff from "../turbotResourceDiff/TurbotResourceDiff";
import TurbotPolicySettingNotification from "./TurbotPolicySettingNotification";
import QUERY from "./TurbotPolicySettingNotification.query";
import { omit } from "lodash";
import PolicySetting from "../../../pages/policy/policySetting/PolicySetting";
import TurbotLoader from "../../turbotLoader/TurbotLoader";
import { logIcon, logColor, LogType } from "../../../utils/logs";
import TurbotNotificationLogsWithListQuery from "../turbotNotificationLogs/hoc/TurbotNotificationLogsWithListQuery";
import { NotificationTypes } from "./../../../utils/notifications";
import TurbotEmptyNotification from "../turbotEmptyNotification/TurbotEmptyNotification";

class TurbotPolicySettingNotificationContainer extends Component {
  static propTypes = {
    processId: PropTypes.string,
    notification: TypeTurbotNotification,
    type: PropTypes.oneOf([
      NotificationTypes.POLICY_SETTING_CREATED,
      NotificationTypes.POLICY_SETTING_UPDATED,
      NotificationTypes.POLICY_SETTING_DELETED
    ])
  };

  tabsMap = {
    [NotificationTypes.POLICY_SETTING_UPDATED]: [
      { label: "Value", value: 0 },
      { label: "Diff", value: 1 },
      { label: "Log", value: 2 }
    ],
    [NotificationTypes.POLICY_SETTING_CREATED]: [
      { label: "Value", value: 0 },
      { label: "Log", value: 1 }
    ],
    [NotificationTypes.POLICY_SETTING_DELETED]: [
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
    if (this.notificationType === NotificationTypes.POLICY_SETTING_UPDATED)
      return this.tabs.find(tab => tab.label === "Diff");
    else if (this.notificationType === NotificationTypes.POLICY_SETTING_CREATED)
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

  renderDIFF = data => {
    return (
      data.oldPolicySetting && (
        <TurbotResourceDiff
          style={this.style}
          current={data.policySetting}
          previous={data.oldPolicySetting}
        />
      )
    );
  };

  renderSetting = data => {
    try {
      const policySetting = (() => {
        if (data.policySetting) return data.policySetting;
        if (data.oldPolicySetting) return data.oldPolicySetting;
        throw new Error("Missing policySetting data!");
      })();

      return (
        <div style={{ padding: "1.2rem 0 2rem 1.1rem" }}>
          <PolicySetting
            style={{ margin: 0 }}
            tabSize="small"
            policyType={policySetting.type}
            readonly={true}
            setting={policySetting}
          />
        </div>
      );
    } catch (error) {
      // TODO: log error
      console.error(error);
    }
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
    const safeData = {
      policySetting: omit(data.policySetting, [
        "valueSource",
        "type",
        "__typename"
      ]),
      oldPolicySetting: omit(data.oldPolicySetting, ["type", "__typename"])
    };
    if (this.state.selectedTab.label === "Value")
      return this.renderSetting(data);
    if (this.state.selectedTab.label === "Diff")
      return this.renderDIFF(safeData);
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
            <TurbotPolicySettingNotification
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
            </TurbotPolicySettingNotification>
          );
        }}
      </Query>
    );
  }
}

export default withTheme()(TurbotPolicySettingNotificationContainer);
