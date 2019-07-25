import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";

const TurbotModalContentText = ({ children }) => (
  <DialogContentText id="turbot-modal-description">
    {children}
  </DialogContentText>
);

export default TurbotModalContentText;
