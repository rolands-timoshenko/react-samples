import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { ButtonGroup } from "react-bootstrap";
import TurbotToggleGroupStyles from "./TurbotToggleGroup.styles";

const propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

const TurbotToggleGroup = ({ classes, style, size = "md", children }) => {
  return (
    <ButtonGroup style={style} size={size}>
      {children}
    </ButtonGroup>
  );
};

TurbotToggleGroup.propTypes = propTypes;

export default withStyles(TurbotToggleGroupStyles)(TurbotToggleGroup);
