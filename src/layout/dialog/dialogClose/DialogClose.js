import React from "react";
import PropTypes from "prop-types";
import DialogCloseStyles from "./DialogClose.styles";
import TurbotIconButton from "../../../shared/turbotIconButton/TurbotIconButton";
import TurbotIcon from "../../../shared/turbotIcon/TurbotIcon";
import { withStyles } from "@material-ui/core/styles";

const propTypes = {
  onClick: PropTypes.func.isRequired
};

const DialogClose = ({ classes, onClick }) => {
  return (
    <TurbotIconButton classes={classes} onClick={onClick}>
      <TurbotIcon icon={["fal", "times-circle"]} fixedWidth={false} />
    </TurbotIconButton>
  );
};

DialogClose.propTypes = propTypes;

export default withStyles(DialogCloseStyles)(DialogClose);
