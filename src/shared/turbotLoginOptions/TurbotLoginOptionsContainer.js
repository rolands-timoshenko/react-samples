import React, { Component } from "react";
import AwsApi from "../../api/AwsAPi";
import TurbotAwsSignInButtonContainer from "../turbotLoginButtons/turbotAwsSignInButton/TurbotAwsSignInButtonContainer";
import TurbotAzureSignInButtonContainer from "../turbotLoginButtons/turbotAzureSignInButton/TurbotAzureSignInButtonContainer";
import TurbotGcpSignInButtonContainer from "../turbotLoginButtons/turbotGcpSignInButton/TurbotGcpSignInButtonContainer";
import TurbotLoginSelect from "../turbotLoginSelect/TurbotLoginSelect";
import { cloudLoginResourceTypes } from "../../utils/permissions";
import TurbotLoginsSelectContainer from "../turbotLoginsSelect/TurbotLoginsSelectContainer";

class TurbotLoginOptionsContainer extends Component {
  state = {
    processing: false
  };

  handleClick = (loginResourceType, params) => {
    this.setState({ processing: true }, async () => {
      try {
        switch (loginResourceType) {
          case cloudLoginResourceTypes.AwsAccount:
            const consoleLoginUrl = await new AwsApi().getAwsConsoleLoginUrl({
              accountId: params.resource.Id,
              permissionTypeAka: params.permissionTypeAka,
              permissionLevelAka: params.permissionLevelAka,
              roleName: params.roleName
            });
            if (consoleLoginUrl) {
              window.open(consoleLoginUrl);
            }
            break;
          case cloudLoginResourceTypes.AzureSubscription:
            break;
          case cloudLoginResourceTypes.GcpProject:
            params.resource &&
              params.resource.projectId &&
              window.open(
                `https://console.cloud.google.com/home/dashboard?project=${params.resource.projectId}`,
                "_blank"
              );
            break;
        }
        this.setState({ processing: false });
      } catch (e) {
        console.log(e);
        this.setState({ processing: false });
      }
    });
  };

  render() {
    const {
      total,
      [cloudLoginResourceTypes.AwsAccount]: awsAccountsAndActiveGrants,
      [cloudLoginResourceTypes.AzureSubscription]: azureSubscriptionsAndActiveGrants,
      [cloudLoginResourceTypes.GcpProject]: gcpProjectsAndActiveGrants
    } = this.props.loginResourcesByCloudProvider;

    // Nothing to log in to...
    if (total === 0) {
      return null;
    }

    // TODO We can look to improve this later, but a simple case here is a single Azure or
    // GCP resource...just show a button as login for them is simply a new URL
    if (total === 1 && azureSubscriptionsAndActiveGrants.length === 1) {
      return (
        <TurbotAzureSignInButtonContainer
          loginLevelResource={this.props.resource}
          resource={azureSubscriptionsAndActiveGrants[0].cloudResource.object}
          onClick={this.handleClick}
          processing={this.state.processing}
        />
      );
    }
    if (total === 1 && gcpProjectsAndActiveGrants.length === 1) {
      return (
        <TurbotGcpSignInButtonContainer
          loginLevelResource={this.props.resource}
          resource={gcpProjectsAndActiveGrants[0].cloudResource.object}
          onClick={this.handleClick}
          processing={this.state.processing}
        />
      );
    }

    // Next case is a single AWS project - it might be a simple button, or it might
    // be multiple login options, depending on the value of the permissions mode and
    // the number of roles available for login.
    if (total === 1 && awsAccountsAndActiveGrants.length === 1) {
      return (
        <TurbotAwsSignInButtonContainer
          activeGrants={awsAccountsAndActiveGrants[0].activeGrants}
          loginLevelResource={this.props.resource}
          onClick={this.handleClick}
          permissionsMode={
            awsAccountsAndActiveGrants[0].cloudResource.awsPermissionsMode.value
          }
          processing={this.state.processing}
          resource={awsAccountsAndActiveGrants[0].cloudResource.object}
        />
      );
    }

    // Else it's a mixture of cloud providers, so we need to render a list of
    // all the things available for login
    return (
      <TurbotLoginsSelectContainer
        awsAccountsAndActiveGrants={awsAccountsAndActiveGrants}
        azureSubscriptionsAndActiveGrants={azureSubscriptionsAndActiveGrants}
        gcpProjectsAndActiveGrants={gcpProjectsAndActiveGrants}
        loginLevelResource={this.props.resource}
        onSelect={this.handleClick}
        processing={this.state.processing}
      />
    );
  }
}

export default TurbotLoginOptionsContainer;
