import React, { Component } from "react";
import PropTypes from "prop-types";
import TableItemAction from "./TableItemAction";

const TypeAction = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string
});

class TableItemActionContainer extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(TypeAction),
    onSelect: PropTypes.func
  };

  static defaultProps = {
    actions: []
  };

  state = {
    anchorEl: null
  };

  handleClose = evt => {
    evt.stopPropagation();
    this.setState({
      anchorEl: null
    });
  };

  handleClick = evt => {
    evt.stopPropagation();
    this.setState({
      anchorEl: evt.currentTarget
    });
  };

  handleSelect = (evt, action) => {
    evt.stopPropagation();
    this.setState({
      anchorEl: null
    });
    this.props.onSelect && this.props.onSelect(action);
  };

  render() {
    const { actions } = this.props;
    return (
      <TableItemAction
        actions={actions}
        anchorEl={this.state.anchorEl}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default TableItemActionContainer;
