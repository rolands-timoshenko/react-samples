import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotButtonSelect from "./TurbotButtonSelect";

const TypeIcon = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

const TypeOption = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  value: PropTypes.string.isRequired,
  icon: TypeIcon,
  color: PropTypes.string
});

// TODO: split component logic & view
class TurbotButtonSelectContainer extends Component {
  static propTypes = {
    selected: TypeOption,
    options: PropTypes.arrayOf(TypeOption).isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func,
    style: PropTypes.object,
    variant: PropTypes.string,
    label: PropTypes.any,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    color: PropTypes.string,
    invert: PropTypes.bool
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

  renderIcon = () => {
    const { icon, color } = this.props.selected;
    const style = color ? { color } : null;
    return icon ? <TurbotIcon icon={icon} style={style} /> : null;
  };

  handleClick = evt => {
    this.setState({ anchorEl: evt.currentTarget });
  };

  handleSelect = option => {
    this.props.onSelect(option);
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderLabel = () => {
    return this.props.label ? (
      this.props.label
    ) : (
      <Fragment>
        {this.renderIcon()}
        &nbsp;
        {this.selected.color ? (
          <span style={{ color: this.selected.color }}>
            {this.selected.label}
          </span>
        ) : (
          this.selected.label
        )}
        &nbsp;
      </Fragment>
    );
  };

  render() {
    const {
      buttonClasses = {},
      disabled,
      size,
      variant,
      color,
      classes,
      style,
      invert,
      anchorOrigin,
      transformOrigin
    } = this.props;
    return (
      <TurbotButtonSelect
        buttonClasses={buttonClasses}
        disabled={disabled}
        invert={invert}
        style={style}
        classes={classes}
        size={size}
        variant={variant}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        color={color}
        onClick={this.handleClick}
        onSelect={this.handleSelect}
        onClose={this.handleClose}
        label={this.renderLabel()}
        options={this.options}
        anchorEl={this.state.anchorEl}
      />
    );
  }
}

export default TurbotButtonSelectContainer;
