import PropTypes from "prop-types";
import React, { Component } from "react";
import TurbotSelect from "./TurbotSelect";

const TypeOption = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

class TurbotSelectContainer extends Component {
  static propTypes = {
    selected: PropTypes.arrayOf(TypeOption),
    options: PropTypes.arrayOf(TypeOption).isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func,
    style: PropTypes.object,
    selectedInLabel: PropTypes.bool,
    allEnabledOverride: PropTypes.string,
    preventNone: PropTypes.bool
  };

  localStyles = {
    padding: "10px 15px",
    cursor: "pointer",
    ...this.props.style
  };

  state = {
    anchorEl: null
  };

  get options() {
    return this.props.options;
  }

  get selected() {
    return this.props.selected;
  }

  handleButtonClick = evt => {
    this.setState({ anchorEl: evt.currentTarget });
  };

  handleItemSelect = option => {
    this.props.onSelect(option, this.props.preventNone);
    this.setState({ anchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { options, label, selectedInLabel, allEnabledOverride } = this.props;
    return (
      <TurbotSelect
        options={options}
        label={label}
        anchorEl={this.state.anchorEl}
        onClose={this.handleMenuClose}
        onClick={this.handleButtonClick}
        onSelect={this.handleItemSelect}
        selected={this.selected}
        selectedInLabel={selectedInLabel}
        allEnabledOverride={allEnabledOverride}
      />
    );
  }
}

export default TurbotSelectContainer;
