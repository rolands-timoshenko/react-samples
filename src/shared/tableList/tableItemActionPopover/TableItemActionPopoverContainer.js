import React, { Component } from "react";
import PropTypes from "prop-types";
import TableItemActionPoper from "./TableItemActionPopover";

class TableItemActionPopoverContainer extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
    processing: PropTypes.bool
  };

  static defaultProps = {
    processing: false
  };

  updatePosition = null;

  state = {
    anchorEl: null
  };

  handleClick = evt => {
    evt.stopPropagation();
    this.setState({
      anchorEl: evt.currentTarget
    });
    this.props.onOpen && this.props.onOpen();
  };

  handleClose = evt => {
    evt.stopPropagation();
    this.setState({
      anchorEl: null
    });
  };

  renderChildren = children => {
    return (
      children &&
      React.cloneElement(children, {
        close: () => {
          this.setState({
            anchorEl: null
          });
        }
      })
    );
  };

  render() {
    const { children, processing } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(this.state.anchorEl);
    return (
      <TableItemActionPoper
        processing={processing}
        anchorEl={anchorEl}
        open={open}
        onClick={this.handleClick}
        onClose={this.handleClose}
      >
        {this.renderChildren(children)}
      </TableItemActionPoper>
    );
  }
}

export default TableItemActionPopoverContainer;
