import Popover from "@material-ui/core/Popover";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func
};

const TurbotPopover = ({ anchorEl, onClose, children, ...rest }) => {
  const defaultProps = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    }
  };

  const PopoverStyle = {
    ...(anchorEl && { minWidth: `${anchorEl.clientWidth}px` })
  };

  return (
    <Popover
      PaperProps={{
        style: PopoverStyle
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      {...defaultProps}
      {...rest}
    >
      {children}
    </Popover>
  );
};

TurbotPopover.propTypes = propTypes;

export default TurbotPopover;
