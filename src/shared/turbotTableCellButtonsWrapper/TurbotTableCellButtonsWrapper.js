import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  position: PropTypes.oneOf(["left", "right"])
};

const TurbotTableCellButtonsWrapper = ({ position = "right", children }) => {
  const wrapperStyle = {
    display: "flex",
    float: position
  };

  const renderButtons = () => {
    const buttons = [];
    React.Children.forEach(children, child => {
      if (child !== null) {
        buttons.push(React.cloneElement(child, { style: { margin: "0 3px" } }));
      }
    });
    return buttons;
  };

  return <div style={wrapperStyle}>{renderButtons()}</div>;
};

TurbotTableCellButtonsWrapper.propTypes = propTypes;

export default TurbotTableCellButtonsWrapper;
