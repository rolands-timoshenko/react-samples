import React, { Component } from "react";
import TurbotAwsSignInButton from "./TurbotAwsSignInButton";
import withClient from "../../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import { cloudLoginResourceTypes } from "../../../utils/permissions";
import { compose } from "react-apollo";
import { getLoginOptions } from "../../../utils/aws";

class TurbotAwsSignInButtonContainer extends Component {
  state = {
    processing: false
  };

  handleClick = option => {
    this.props.onClick(cloudLoginResourceTypes.AwsAccount, {
      type: option.type,
      resource: this.props.resource,
      permissionTypeAka: option.permissionTypeAka,
      permissionLevelAka: option.permissionLevelAka,
      roleName: option.roleName
    });
  };

  render() {
    const {
      activeGrants,
      loginLevelResource,
      permissionsMode,
      resource
    } = this.props;
    const loginOptions = getLoginOptions(
      activeGrants,
      permissionsMode,
      loginLevelResource,
      resource,
      loginLevelResource.turbot.id !== resource.turbot.id
    );
    return (
      <TurbotAwsSignInButton
        loginOptions={loginOptions}
        processing={this.props.processing}
        onClick={this.handleClick}
      />
    );
  }
}

const enhance = compose(
  withClient,
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotAwsSignInButtonContainer);
