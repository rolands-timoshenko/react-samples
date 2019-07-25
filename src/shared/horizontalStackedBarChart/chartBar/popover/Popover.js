import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import PopoverStyles from "./Popover.styles";

const propTypes = {
  coords: PropTypes.shape({
    pageY: PropTypes.number.isRequired,
    pageX: PropTypes.number.isRequired
  }),
  setRef: PropTypes.func.isRequired
};

const Popover = ({ classes, coords, children, setRef }) => {
  const PaperClasses = {
    root: classes.paper__root
  };
  return ReactDOM.createPortal(
    <div
      ref={setRef}
      className={classes.root}
      style={{
        ...(coords && { top: coords.pageY, left: coords.pageX }),
        visibility: coords ? 1 : 0
      }}
    >
      <Paper classes={PaperClasses}>{children}</Paper>
    </div>,
    document.body
  );
};

Popover.propTypes = propTypes;

export default withStyles(PopoverStyles)(Popover);
