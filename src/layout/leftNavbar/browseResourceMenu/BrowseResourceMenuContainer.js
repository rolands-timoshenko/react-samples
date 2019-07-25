import React, { Component, Fragment } from "react";
import BrowseResourceMenu from "./BrowseResourceMenu";
import CreateResourceContainer from "../../../pages/resource/manageResource/createResource/CreateResourceContainer";
import DeleteResourceContainer from "../../../pages/resource/manageResource/deleteResource/DeleteResourceContainer";
import PermissionsChecker from "../../../shared/permissions/PermissionsChecker";
import _ from "lodash";
import { addScopeFilterToUrl } from "../../../utils/urls";
import { withRouter } from "react-router";
import { getTitle } from "../../../utils/resources";
import SmartFolderAttachmentEditContainer from "../../../pages/smartFolders/smartFolderAttachmentEdit/SmartFolderAttachmentEditContainer";

class BrowseResourceMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: false,
      dialogOpen: false,
      dialogSelectedOption: null
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  navigateToParentResource(resource) {
    addScopeFilterToUrl(
      this.props.location,
      this.props.history,
      "resource",
      resource.turbot.parentId,
      true
    );
  }

  options(resource) {
    const { canCreate, canEdit, canDelete } = this.props;
    const options = [];
    if (canCreate) {
      options.push({
        id: "createResource",
        label: "Create child resource",
        component: CreateResourceContainer,
        props: {
          parentResource: resource
        }
      });
    }
    if (canEdit) {
      options.push({
        id: "editResource",
        label: `Edit ${_.toLower(getTitle(resource.type))} ${getTitle(
          resource
        )}`,
        component: CreateResourceContainer,
        props: {
          mode: "edit",
          resource,
          resourceType: resource.type
        }
      });
    }
    // TODO: #1061 enable when smart folders support added
    // if (canEdit) {
    //   options.push({
    //     id: "editResourceAttachments",
    //     label: `Edit smart folder attachments`,
    //     component: SmartFolderAttachmentEditContainer,
    //     props: {
    //       resource: resource
    //     }
    //   });
    // }
    if (canDelete) {
      options.push({
        id: "deleteResource",
        label: `Delete ${_.toLower(getTitle(resource.type))} ${getTitle(
          resource
        )}`,
        component: DeleteResourceContainer,
        props: {
          resource
        },
        postAction: () => this.navigateToParentResource(resource)
      });
    }
    return options;
  }

  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      menuOpen: true
    });
  }

  handleMenuClose(event) {
    this.setState({
      anchorEl: null,
      menuOpen: false
    });
  }

  handleMenuItemClick(item) {
    this.setState({
      anchorEl: null,
      menuOpen: false,
      dialogOpen: true,
      dialogSelectedOption: item
    });
  }

  handleDialogClose(postAction) {
    this.setState(
      {
        dialogOpen: false,
        dialogSelectedOption: null
      },
      () => {
        if (postAction) {
          postAction();
        }
      }
    );
  }

  render() {
    const selectedOption = this.state.dialogSelectedOption;
    const SelectedOptionComponent = selectedOption
      ? selectedOption.component
      : null;

    return (
      <PermissionsChecker
        resource={this.props.resource}
        permissionTypeUri=""
        permissionLevelUri=""
      >
        {hasPermission => {
          return hasPermission ? (
            <Fragment>
              <BrowseResourceMenu
                resource={this.props.resource}
                options={this.options(this.props.resource)}
                anchorEl={this.state.anchorEl}
                open={this.state.menuOpen}
                onMenuClick={this.handleMenuClick}
                onMenuClose={this.handleMenuClose}
                onMenuItemClick={this.handleMenuItemClick}
              />
              {selectedOption && (
                <SelectedOptionComponent
                  {...selectedOption.props}
                  open
                  onClose={success =>
                    this.handleDialogClose(
                      success ? selectedOption.postAction : null
                    )
                  }
                />
              )}
            </Fragment>
          ) : null;
        }}
      </PermissionsChecker>
    );
  }
}

export default withRouter(BrowseResourceMenuContainer);
