import MaterialTextField from "@material-ui/core/TextField";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

class TextField extends React.Component {
  static defaultProps = {
    value: "",
    type: "",
    label: "",
    classes: {},
    error: false,
    disable: false,
    onChange: () => {}
  };

  state = {
    value: this.props.value,
    error: this.props.value !== "" && this.props.error
  };

  classes = this.props.classes;

  debounceOnChange = debounce(() => {
    this.props.onChange(this.state.value);
  }, 50);

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      error: nextProps.value !== "" && nextProps.error
    });
  }

  handleOnChange = evt => {
    this.setState({
      value: evt.currentTarget.value,
      error: false
    });
    this.debounceOnChange();
  };

  render() {
    const { type, label, disabled } = this.props;
    return (
      <MaterialTextField
        classes={this.classes}
        disabled={disabled}
        type={type}
        onChange={this.handleOnChange}
        fullWidth={true}
        id={`${label}-field`}
        label={label}
        margin="normal"
        variant="outlined"
        value={this.state.value}
        error={this.state.error}
      />
    );
  }
}

TextField.propTypes = propTypes;

export default TextField;
