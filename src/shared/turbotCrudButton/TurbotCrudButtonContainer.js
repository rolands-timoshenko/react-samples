import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotCrudButton from "./TurbotCrudButton";

class TurbotCrudButtonContainer extends Component {
  state = {
    dialogOpen: false
  };

  static propTypes = {
    dialogCmp: PropTypes.element,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: PropTypes.object,
    variant: PropTypes.string,
    refetch: PropTypes.func,
    isDisabled: PropTypes.bool,
    hoverState: PropTypes.string,
    iconType: PropTypes.bool,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    refetch: () => {}
  };

  handleClick = async evt => {
    evt.stopPropagation();
    this.setState({
      dialogOpen: true
    });
  };

  handleCloseDialog = () => {
    this.setState(
      {
        dialogOpen: false
      },
      this.props.refetch
    );
  };

  render() {
    const {
      label,
      style,
      onClose,
      variant,
      outline,
      iconType,
      dialogCmp,
      hoverState,
      isDisabled
    } = this.props;

    return (
      <TurbotCrudButton
        hoverState={hoverState}
        dialogOpen={this.state.dialogOpen}
        onClick={this.handleClick}
        onClose={
          onClose
            ? data => {
                onClose(data);
                this.handleCloseDialog();
              }
            : this.handleCloseDialog
        }
        dialogCmp={dialogCmp}
        label={label}
        style={style}
        variant={variant}
        isDisabled={isDisabled}
        outline={outline}
        iconType={iconType}
      />
    );
  }
}

export default TurbotCrudButtonContainer;
