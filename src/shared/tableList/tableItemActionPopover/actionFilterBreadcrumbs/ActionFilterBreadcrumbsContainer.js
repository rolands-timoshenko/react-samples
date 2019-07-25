import React, { Component } from "react";
import ActionFilterBreadcrumbs from "./ActionFilterBreadcrumbs";
import PropTypes from "prop-types";
import { addScopeFilterToUrl } from "../../../../utils/urls";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { hasPermission } from "../../../../utils/permissions";
import {
  selectPermissionsMetadata,
  selectUserPermissions
} from "../../../../store/selectors/Permissions";
import { withRouter } from "react-router-dom";

class ActionFilterBreadcrumbsContainer extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    close: PropTypes.func
  };

  handleClick = (key, value) => () => {
    addScopeFilterToUrl(this.props.location, this.props.history, key, value);
    if (this.props.close) this.props.close();
  };

  hasPermissionForType = (type, path) => {
    if (type !== "resource") {
      return true;
    }

    return this.props.permissionsMetadata && this.props.userPermissions
      ? hasPermission(
          path,
          "",
          "",
          this.props.permissionsMetadata,
          this.props.userPermissions
        )
      : false;
  };

  render() {
    return (
      <ActionFilterBreadcrumbs
        breadcrumbs={this.props.breadcrumbs}
        hasPermissionForType={this.hasPermissionForType}
        isLast={this.props.isLast}
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    permissionsMetadata: selectPermissionsMetadata(state),
    userPermissions: selectUserPermissions(state)
  };
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
);

export default enhance(ActionFilterBreadcrumbsContainer);
