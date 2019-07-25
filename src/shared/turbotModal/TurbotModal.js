import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TurbotModalStyles from "./TurbotModal.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const TurbotModal = ({
  classes,
  children,
  disableBackdropClick = true,
  disableEscapeKeyDown = true,
  maxWidth = "xl",
  onClose,
  open
}) => {
  return (
    <Dialog
      aria-describedby="turbot-modal-description"
      aria-labelledby="turbot-modal-title"
      classes={classes}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      maxWidth={maxWidth}
      onClick={evt => evt.stopPropagation()}
      onClose={onClose}
      open={open}
    >
      {children}
    </Dialog>
  );
};

export default withStyles(TurbotModalStyles)(TurbotModal);
