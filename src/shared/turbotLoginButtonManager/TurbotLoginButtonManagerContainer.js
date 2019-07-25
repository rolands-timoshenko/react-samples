import React, { Component } from "react";
import PropTypes from "prop-types";
import QUERY from "./TurbotLoginButtonManager.queries";
import TurbotLoginOptionsContainer from "../turbotLoginOptions/TurbotLoginOptionsContainer";
import withClient from "../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import withTurbotErrorHandlerProvider from "../turbotErrorHandler/withTurbotErrorHandlerProvider";
import _ from "lodash";
import {
  cloudLoginPermissionTypes,
  cloudLoginResourceTypes
} from "../../utils/permissions";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { selectLoggedInProfile } from "../../store/selectors/User";
import { selectPermissionsMetadata } from "../../store/selectors/Permissions";

class TurbotLoginButtonManagerContainer extends Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    client: PropTypes.any.isRequired,
    profile: PropTypes.object.isRequired
  };

  state = {
    permissibleLoginResources: []
  };

  getLoginResourcesByCloudProvider() {
    const cloudLoginResources = {
      total: this.state.permissibleLoginResources.length,
      [cloudLoginResourceTypes.AwsAccount]: [],
      [cloudLoginResourceTypes.AzureSubscription]: [],
      [cloudLoginResourceTypes.GcpProject]: []
    };
    this.state.permissibleLoginResources.forEach(
      cloudResourceAndActiveGrants => {
        const typeUri = _.get(
          cloudResourceAndActiveGrants,
          "cloudResource.type.uri"
        );
        switch (typeUri) {
          case cloudLoginResourceTypes.AwsAccount:
            cloudLoginResources[cloudLoginResourceTypes.AwsAccount].push(
              cloudResourceAndActiveGrants
            );
            break;
          case cloudLoginResourceTypes.AzureSubscription:
            cloudLoginResources[cloudLoginResourceTypes.AzureSubscription].push(
              cloudResourceAndActiveGrants
            );
            break;
          case cloudLoginResourceTypes.GcpProject:
            cloudLoginResources[cloudLoginResourceTypes.GcpProject].push(
              cloudResourceAndActiveGrants
            );
            break;
        }
      }
    );
    return cloudLoginResources;
  }

  shouldShowAwsLoginOptions(permissionsMode) {
    if (!permissionsMode || typeof permissionsMode !== "string") {
      return false;
    }
    const permissionModeLower = permissionsMode.toLowerCase();
    if (permissionModeLower.indexOf("role mode") > -1) {
      return true;
    }
    if (permissionModeLower.indexOf("user mode") > -1) {
      return true;
    }
    return false;
  }

  loadCloudResourcesAndActiveGrantsForResource = async () => {
    try {
      const { data } = await this.props.client.query({
        errorPolicy: "all", // Allow errors through
        query: QUERY,
        variables: {
          filter: [
            `resource:${this.props.resource.turbot.id} level:ancestor,self,descendant`,
            `resourceType:${cloudLoginResourceTypes.AwsAccount},${cloudLoginResourceTypes.AzureSubscription},${cloudLoginResourceTypes.GcpProject}`,
            "limit:1000"
          ],
          activeGrantsFilter: [
            `resource:${this.props.resource.turbot.id} level:ancestor,self`,
            `profile:${this.props.profile.turbot.id}`,
            `permissionType:${cloudLoginPermissionTypes.Aws},${cloudLoginPermissionTypes.Azure},${cloudLoginPermissionTypes.Gcp}`,
            "limit:1000"
          ]
        }
      });
      return {
        cloudResources: _.get(data, "cloudResources.items", []),
        activeGrants: _.get(data, "activeGrantList.items", [])
      };
    } catch (error) {
      this.props.errorHandler.setError(error);
      return {
        cloudResources: [],
        activeGrants: []
      };
    }
  };

  filterActiveGrantsByRootPermissionType = (
    activeGrants,
    desiredRootPermissionType
  ) => {
    return activeGrants.filter(activeGrant => {
      const rootPermissionTypeId = _.get(
        activeGrant,
        "grant.type.trunk.items[0].turbot.id"
      );
      return (
        rootPermissionTypeId === _.get(desiredRootPermissionType, "turbot.id")
      );
    });
  };

  getActiveGrantsForResourceType(cloudResource, activeGrants) {
    const cloudResourceTypeUri = _.get(cloudResource, "type.uri");
    switch (cloudResourceTypeUri) {
      case cloudLoginResourceTypes.AwsAccount:
        const permissionsMode = _.get(
          cloudResource,
          "awsPermissionsMode.value"
        );
        if (!this.shouldShowAwsLoginOptions(permissionsMode)) {
          return [];
        }
        const awsPermissionType = _.get(
          this.props,
          "permissionsMetadata.types",
          {}
        )[cloudLoginPermissionTypes.Aws];
        return this.filterActiveGrantsByRootPermissionType(
          activeGrants,
          awsPermissionType
        );
      case cloudLoginResourceTypes.AzureSubscription:
        const azurePermissionType = _.get(
          this.props,
          "permissionsMetadata.types",
          {}
        )[cloudLoginPermissionTypes.Azure];
        return this.filterActiveGrantsByRootPermissionType(
          activeGrants,
          azurePermissionType
        );
      case cloudLoginResourceTypes.GcpProject:
        const gcpPermissionType = _.get(
          this.props,
          "permissionsMetadata.types",
          {}
        )[cloudLoginPermissionTypes.Gcp];
        return this.filterActiveGrantsByRootPermissionType(
          activeGrants,
          gcpPermissionType
        );
      default:
        return [];
    }
  }

  filterLoginResourcesWithActiveGrants(cloudResourcesAndActiveGrants) {
    const permissableLoginResources = [];
    cloudResourcesAndActiveGrants.cloudResources.forEach(cloudResource => {
      const activeGrantsForResourceType = this.getActiveGrantsForResourceType(
        cloudResource,
        cloudResourcesAndActiveGrants.activeGrants
      );
      if (!_.isEmpty(activeGrantsForResourceType)) {
        permissableLoginResources.push({
          cloudResource,
          activeGrants: activeGrantsForResourceType
        });
      }
    });
    return permissableLoginResources;
  }

  getCloudResourceForLogin = async () => {
    const cloudResourcesAndActiveGrants = await this.loadCloudResourcesAndActiveGrantsForResource();
    const permissibleLoginResources = this.filterLoginResourcesWithActiveGrants(
      cloudResourcesAndActiveGrants
    );
    this.setState({
      permissibleLoginResources
    });
  };

  async componentDidMount() {
    this.getCloudResourceForLogin();
  }

  async componentDidUpdate(prevProps) {
    if (
      _.get(prevProps, "resource.turbot.id") !==
      _.get(this.props, "resource.turbot.id")
    ) {
      // If resource or permissions have changed, recalculate the login options
      this.getCloudResourceForLogin();
    }
  }

  render() {
    if (_.isEmpty(this.state.permissibleLoginResources)) {
      return null;
    }
    return (
      <TurbotLoginOptionsContainer
        loginResourcesByCloudProvider={this.getLoginResourcesByCloudProvider()}
        resource={this.props.resource}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    permissionsMetadata: selectPermissionsMetadata(state),
    profile: selectLoggedInProfile(state)
  };
};

const enhance = compose(
  withTurbotErrorHandlerProvider(null),
  withClient,
  connect(mapStateToProps),
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotLoginButtonManagerContainer);
