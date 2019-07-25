import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import TurbotCrudManager from "./TurbotCrudManager";

class TurbotCrudManagerContainer extends Component {
  state = {
    createOpen: false,
    editOpen: false,
    removeOpen: false
  };

  static propTypes = {
    // Refetch data on close Dialog
    refetch: PropTypes.func,
    onChange: PropTypes.func,
    // Dialog Components
    editCmp: PropTypes.element,
    createCmp: PropTypes.element,
    removeCmp: PropTypes.element
  };

  get canEdit() {
    return !!this.props.editCmp;
  }

  get canCreate() {
    return !!this.props.createCmp;
  }

  get canRemove() {
    return !!this.props.removeCmp;
  }

  handleNewClick = () => {
    this.setState({ createOpen: true });
  };

  handleCloseCreate = () => {
    this.setState({ createOpen: false });
    this.props.onChange && this.props.onChange();
    this.props.refetch && this.props.refetch();
  };

  handleEditClick = () => {
    this.setState({ editOpen: true });
  };

  handleCloseEdit = () => {
    this.setState({ editOpen: false });
    this.props.onChange && this.props.onChange();
    this.props.refetch && this.props.refetch();
  };

  handleDeleteClick = () => {
    this.setState({ removeOpen: true });
  };

  handleCloseDelete = () => {
    this.setState({ removeOpen: false });
    this.props.onChange && this.props.onChange();
    this.props.refetch && this.props.refetch();
  };

  renderEditCmp = () => {
    return React.cloneElement(this.props.editCmp, {
      onClose: this.handleCloseEdit
    });
  };

  renderCreateCmp = () => {
    return React.cloneElement(this.props.createCmp, {
      onClose: this.handleCloseCreate
    });
  };

  renderRemoveCmp = () => {
    return React.cloneElement(this.props.removeCmp, {
      onClose: this.handleCloseDelete
    });
  };

  render() {
    return (
      <Fragment>
        <TurbotCrudManager
          canCreate={this.canCreate}
          canDelete={this.canRemove}
          canEdit={this.canEdit}
          onNewClick={this.handleNewClick}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
        />
        {this.state.createOpen && this.renderCreateCmp()}
        {this.state.editOpen && this.renderEditCmp()}
        {this.state.removeOpen && this.renderRemoveCmp()}
      </Fragment>
    );
  }
}

export default TurbotCrudManagerContainer;
