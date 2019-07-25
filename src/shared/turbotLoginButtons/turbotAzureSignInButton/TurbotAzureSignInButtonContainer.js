import PropTypes from "prop-types";
import React, { Component } from "react";
import TurbotAzureSignInButton from "./TurbotAzureSignInButton";
import { cloudLoginResourceTypes } from "../../../utils/permissions";

class TurbotAzureSignInButtonContainer extends Component {
  static propTypes = {
    resource: PropTypes.object.isRequired
  };

  render() {
    const { resource, ...rest } = this.props;
    return (
      <TurbotAzureSignInButton
        {...rest}
        onClick={() =>
          this.props.onClick(cloudLoginResourceTypes.AzureSubscription, {
            resource: this.props.resource
          })
        }
      />
    );
  }
}

export default TurbotAzureSignInButtonContainer;
