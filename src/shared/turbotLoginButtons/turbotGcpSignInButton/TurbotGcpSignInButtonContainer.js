import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotGcpSignInButton from "./TurbotGcpSignInButton";
import { cloudLoginResourceTypes } from "../../../utils/permissions";

class TurbotGcpSignInButtonContainer extends Component {
  static propTypes = {
    resource: PropTypes.object.isRequired
  };

  render() {
    const { resource, ...rest } = this.props;
    const projectId =
      this.props.loginLevelResource.turbot.id === this.props.resource.turbot.id
        ? null
        : this.props.resource.projectId;
    return (
      <TurbotGcpSignInButton
        {...rest}
        onClick={() =>
          this.props.onClick(cloudLoginResourceTypes.GcpProject, {
            resource: this.props.resource
          })
        }
        projectId={projectId}
      />
    );
  }
}

export default TurbotGcpSignInButtonContainer;
