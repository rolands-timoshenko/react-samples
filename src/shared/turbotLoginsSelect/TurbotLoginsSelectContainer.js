import React, { Component } from "react";
import TurbotAzureSignInLabel from "../turbotLoginButtons/turbotAzureSignInButton/TurbotAzureSignInLabel";
import TurbotGcpSignInLabel from "../turbotLoginButtons/turbotGcpSignInButton/TurbotGcpSignInLabel";
import TurbotLoginSelect from "../turbotLoginSelect/TurbotLoginSelect";
import withClient from "../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import _ from "lodash";
import { cloudLoginResourceTypes } from "../../utils/permissions";
import { compose } from "react-apollo";
import { getLoginOptions } from "../../utils/aws";

class TurbotLoginsSelectContainer extends Component {
  state = {
    permissionMode: null,
    processing: false
  };

  handleSelect = option => {
    this.props.onSelect(option.onClickParams[0], option.onClickParams[1]);
  };

  render() {
    const {
      awsAccountsAndActiveGrants,
      azureSubscriptionsAndActiveGrants,
      gcpProjectsAndActiveGrants
    } = this.props;
    const awsOptionsArray = awsAccountsAndActiveGrants.map(
      awsAccountAndActiveGrants => {
        const awsLoginOptions = getLoginOptions(
          awsAccountAndActiveGrants.activeGrants,
          awsAccountAndActiveGrants.cloudResource.awsPermissionsMode.value,
          this.props.loginLevelResource,
          awsAccountAndActiveGrants.cloudResource.object,
          true,
          true
        );
        return awsLoginOptions.map(a => {
          const { label, value, ...rest } = a;
          return {
            label,
            value,
            onClickParams: [
              cloudLoginResourceTypes.AwsAccount,
              {
                ...rest,
                resource: awsAccountAndActiveGrants.cloudResource.object
              }
            ]
          };
        });
      }
    );
    const awsOptions = [].concat.apply([], awsOptionsArray);
    const azureOptions = _.sortBy(
      azureSubscriptionsAndActiveGrants.map(
        azureSubscriptionAndActiveGrants => ({
          label: (
            <TurbotAzureSignInLabel
              loginLevelResource={this.props.loginLevelResource}
              resource={azureSubscriptionAndActiveGrants.cloudResource.object}
              processing={this.props.processing}
            />
          ),
          sort:
            azureSubscriptionAndActiveGrants.cloudResource.object
              .subscriptionId,
          value: `azure-subscription-${azureSubscriptionAndActiveGrants.cloudResource.object.subscriptionId}`,
          onClickParams: [
            cloudLoginResourceTypes.AzureSubscription,
            { resource: azureSubscriptionAndActiveGrants.cloudResource.object }
          ]
        })
      ),
      a => a.sort
    );
    const gcpOptions = _.sortBy(
      gcpProjectsAndActiveGrants.map(gcpProjectAndActiveGrants => ({
        label: (
          <TurbotGcpSignInLabel
            loginLevelResource={this.props.loginLevelResource}
            resource={gcpProjectAndActiveGrants.cloudResource.object}
            processing={this.props.processing}
          />
        ),
        sort: gcpProjectAndActiveGrants.cloudResource.object.projectId,
        value: `gcp-project-${gcpProjectAndActiveGrants.cloudResource.object.projectId}`,
        onClickParams: [
          cloudLoginResourceTypes.GcpProject,
          { resource: gcpProjectAndActiveGrants.cloudResource.object }
        ]
      })),
      g => g.sort
    );

    return (
      <TurbotLoginSelect
        disabled={this.props.processing}
        label={this.props.processing ? "Loading..." : "Login"}
        onSelect={this.handleSelect}
        options={[...awsOptions, ...azureOptions, ...gcpOptions]}
      />
    );
  }
}

const enhance = compose(
  withClient,
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotLoginsSelectContainer);
