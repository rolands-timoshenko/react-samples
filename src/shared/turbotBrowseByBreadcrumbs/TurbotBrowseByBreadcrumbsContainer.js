import React, { Component } from "react";
import TurbotBrowseByBreadcrumbs from "./TurbotBrowseByBreadcrumbs";
import { addScopeFilterToUrl } from "../../utils/urls";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { hasBreadcrumbPermission } from "../../utils/permissions";
import {
  selectPermissionsMetadata,
  selectUserPermissions
} from "../../store/selectors/Permissions";
import { withRouter } from "react-router";

class TurbotBrowseByBreadcrumbsContainer extends Component {
  handleBreadcrumbClick = item => {
    addScopeFilterToUrl(
      this.props.location,
      this.props.history,
      this.props.browseBy.mode,
      item.turbot.id,
      true
    );
  };

  checkHasPermissionForResource = resource => {
    return hasBreadcrumbPermission(
      this.props.browseBy.mode,
      resource,
      this.props.permissionsMetadata,
      this.props.userPermissions
    );
  };

  render() {
    return (
      <TurbotBrowseByBreadcrumbs
        browseBy={this.props.browseBy}
        checkHasPermissionForResource={this.checkHasPermissionForResource}
        onBreadcrumbClick={this.handleBreadcrumbClick}
        scopeFilters={this.props.scopeFilters}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    browseBy: state.filters.browseBy,
    permissionsMetadata: selectPermissionsMetadata(state),
    scopeFilters: state.filters.scopeFilters,
    userPermissions: selectUserPermissions(state)
  };
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
);

export default enhance(TurbotBrowseByBreadcrumbsContainer);
