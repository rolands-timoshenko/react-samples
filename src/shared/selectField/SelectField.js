import MenuItem from "@material-ui/core/MenuItem";
import MaterialTextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

class SelectField extends React.Component {
  static defaultProps = {
    items: [],
    value: "",
    type: "",
    label: "",
    classes: {},
    disable: false,
    helperText: "",
    onChange: () => {}
  };

  classes = this.props.classes;

  render() {
    const { helperText, onChange, label, disabled, value, items } = this.props;
    return (
      <MaterialTextField
        classes={this.classes}
        disabled={disabled}
        fullWidth={true}
        id={`${label}-select`}
        select
        label={label}
        helperText={helperText}
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={value}
      >
        {items.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MaterialTextField>
    );
  }
}

SelectField.propTypes = propTypes;

export default SelectField;
