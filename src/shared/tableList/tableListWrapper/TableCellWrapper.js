import React from "react";

const TableCellWrapper = ({ children }) => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "visible"
  };

  const contentStyle = {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    bottom: 0
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default TableCellWrapper;
