import React from "react";
import ChartBartyles from "./ChartBar.styles";
import Label from "./label/Label";
import Popover from "./popover/Popover";
import PropTypes from "prop-types";
import StrokeBg from "./strokeBg/StrokeBg";
import { renderToStaticMarkup } from "react-dom/server";
import { TypeChartBar } from "./ChartBar.types";
import { withStyles } from "@material-ui/core";

const propTypes = {
  option: TypeChartBar.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setContainerRef: PropTypes.func.isRequired,
  setLabelRef: PropTypes.func.isRequired,
  anchorEl: PropTypes.any,
  hideLabel: PropTypes.bool,
  coords: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number
  })
};

const getBarStyle = (backgroundColour, borderColour, styles) => {
  return {
    position: "absolute",
    height: styles.height || "0.5rem",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `${backgroundColour}`,
    border: `1px solid ${borderColour}`
  };
};

const getContainerStyle = (width, styles) => {
  return {
    height: styles.height || "0.5rem",
    width: `${width}%`,
    paddingBottom: 5
  };
};

const renderLabel = (option, coords, setPopoverRef) => {
  return (
    <Popover
      setRef={setPopoverRef}
      coords={coords}
      placement="top-start"
      modifiers={{
        flip: {
          enabled: true
        }
      }}
    >
      <Label option={option} />
    </Popover>
  );
};

const svgString = color =>
  encodeURIComponent(renderToStaticMarkup(<StrokeBg color={color} />));

const dataUri = color => `url("data:image/svg+xml,${svgString(color)}")`;

const ChartBar = ({
  classes,
  option,
  onMouseOver,
  onMouseLeave,
  onClick,
  setContainerRef,
  setPopoverRef,
  anchorEl,
  coords,
  styles = {}
}) => (
  <div
    ref={setContainerRef}
    className={classes.container}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={getContainerStyle(option.width, styles)}
  >
    {anchorEl && renderLabel(option, coords, setPopoverRef)}
    <div
      style={{
        ...getBarStyle(option.backgroundColor, option.borderColor, styles),
        ...(option.stroke && {
          background: dataUri(option.backgroundColor)
        }),
        ...(option.fill && { backgroundColor: option.fill })
      }}
    />
  </div>
);

ChartBar.propTypes = propTypes;

export default withStyles(ChartBartyles)(ChartBar);
