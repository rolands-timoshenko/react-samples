import React from "react";
import PropTypes from "prop-types";
import TurbotButtonSelectContainer from "../turbotButtonSelect/TurbotButtonSelectContainer";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotLoginSelectStyles from "./TurbotLoginSelect.styles";
import { withStyles } from "@material-ui/core";

const TypeLoginSelectOption = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.any
});

const propTypes = {
  options: PropTypes.arrayOf(TypeLoginSelectOption),
  onSelect: PropTypes.func,
  size: PropTypes.string
};

const TurbotLoginSelect = ({
  buttonClasses = {},
  classes,
  disabled,
  label = "Login",
  options = [],
  onSelect = () => {},
  size = "sm"
}) => {
  return (
    <div className={classes.root}>
      <TurbotButtonSelectContainer
        buttonClasses={buttonClasses}
        disabled={disabled}
        color="inherit"
        variant="outline-secondary"
        label={
          <span>
            {label}&nbsp;
            <TurbotIcon icon={["fas", "sign-out-alt"]} />
          </span>
        }
        options={options}
        onSelect={onSelect}
        size={size}
      />
    </div>
  );
};

TurbotLoginSelect.propTypes = propTypes;

export default withStyles(TurbotLoginSelectStyles)(TurbotLoginSelect);
