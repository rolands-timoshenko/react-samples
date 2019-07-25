import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotIconButton from "../../turbotIconButton/TurbotIconButton";
import ActionPopoverLoader from "./actionPopoverLoader/ActionPopoverLoader";
import TableItemActionPopoverStyles from "./TableItemActionPopover.styles";

const propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

const TableItemActionPopover = ({
  classes,
  open,
  anchorEl,
  onClick,
  onClose,
  processing = false,
  children
}) => {
  const TurbotIconButtonClasses = {
    root: classes.turbotIconButton__root
  };

  const TurbotIconClasses = {
    root: classes.turbotIcon_root
  };

  return (
    <div className={classes.root}>
      <TurbotIconButton
        disabled={processing}
        onClick={onClick}
        classes={TurbotIconButtonClasses}
      >
        {processing ? (
          <ActionPopoverLoader />
        ) : (
          <TurbotIcon
            classes={TurbotIconClasses}
            icon={["far", "ellipsis-v"]}
          />
        )}
      </TurbotIconButton>
      <Popover
        onClick={evt => evt.stopPropagation()}
        open={open && !processing}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

TableItemActionPopover.propTypes = propTypes;

export default withStyles(TableItemActionPopoverStyles)(TableItemActionPopover);
