import React from "react";
import PropTypes from "prop-types";
import "./Alert.scss";

const propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "danger", "warning"]),
  onClose: PropTypes.func
};

const Alert = ({ message, type, onClose = () => {} }) => {
  const className = `Turbot-alert Turbot-alert-${type}`;
  return (
    <div className={className} role="alert">
      <button type="button" className="close-alert" onClick={onClose}>
        ×
      </button>
      {message}
    </div>
  );
};

Alert.propTypes = propTypes;

export default Alert;
