import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TurbotAlertStyles from "./TurbotAlert.styles";
import TurbotIcon from "../turbotIcon/TurbotIcon";

export const AlertTypes = Object.freeze({
  ERROR: "error",
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info"
});

const alertIcons = {
  [AlertTypes.ERROR]: ["fas", "exclamation-circle"],
  [AlertTypes.SUCCESS]: ["fas", "check-circle"],
  [AlertTypes.DANGER]: ["fas", "times-circle"],
  [AlertTypes.WARNING]: ["fas", "exclamation-circle"],
  [AlertTypes.INFO]: ["fas", "info-circle"]
};

const propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    AlertTypes.ERROR,
    AlertTypes.SUCCESS,
    AlertTypes.DANGER,
    AlertTypes.WARNING,
    AlertTypes.INFO
  ]),
  onClose: PropTypes.func
};

const TurbotAlert = ({ classes, message, type, onClose, style = {} }) => {
  const rootClassName = (() => {
    const classNames = [];
    classNames.push(classes.root);
    classNames.push(`${classes.root}--${type}`);
    return classNames.join(" ");
  })();

  const closeClassName = (() => {
    const classNames = [];
    classNames.push(classes.close);
    classNames.push(`${classes.close}--${type}`);
    return classNames.join(" ");
  })();

  return (
    <div className={rootClassName} style={style}>
      <span className={classes.text}>
        <TurbotIcon icon={alertIcons[type]} />
        &nbsp;
        <span dangerouslySetInnerHTML={{ __html: message }} />
      </span>
      {onClose && (
        <TurbotIcon
          icon={["fal", "times"]}
          className={classes.text}
          className={closeClassName}
          onClick={onClose}
        />
      )}
    </div>
  );
};

TurbotAlert.propTypes = propTypes;

export default withStyles(TurbotAlertStyles)(TurbotAlert);
