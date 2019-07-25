import React from "react";
import Button from "@material-ui/core/Button";
import TurbotButtonStyles from "./TurbotButton.styles";
import { withStyles } from "@material-ui/core/styles";
import { adjustClasses } from "../../utils/styling";

const TurbotButton = ({ invert, classes, ...props }) => {
  if (invert) {
    classes = adjustClasses(classes, ["invert"], ["outlined"]);
  }

  return (
    <Button classes={classes} {...props}>
      {props.children}
    </Button>
  );
};

export default withStyles(TurbotButtonStyles)(TurbotButton);
