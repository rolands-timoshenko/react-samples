import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import TurbotModalTitleStyles from "./TurbotModalTitle.styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TurbotIconButton from "../turbotIconButton/TurbotIconButton";
import TurbotIcon from "../turbotIcon/TurbotIcon";

const TurbotModalTitle = ({ children, classes, onClose }) => {
  return (
    <DialogTitle
      className={classes.root}
      disableTypography
      id="turbot-modal-title"
      onClose={onClose}
    >
      <Typography variant="h6" classes={{ h6: classes.title }}>
        {children}
      </Typography>
      {onClose ? (
        <TurbotIconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <TurbotIcon icon={["fal", "times"]} fixedWidth={false} />
        </TurbotIconButton>
      ) : null}
    </DialogTitle>
  );
};

export default withStyles(TurbotModalTitleStyles)(TurbotModalTitle);
