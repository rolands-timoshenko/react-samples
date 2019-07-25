import React from "react";
import LabelStyles from "./Label.styles";
import PropTypes from "prop-types";
import TurbotIcon from "../../../turbotIcon/TurbotIcon";
import { TypeChartBar } from "../ChartBar.types";
import { withStyles } from "@material-ui/core";

// FIXME: for some reason import bellow is not working
// import { TypeChartBar } from "../ChartBar";
// const TypeChartBar = PropTypes.shape({
//   color: PropTypes.string.isRequired,
//   value: PropTypes.number.isRequired,
//   icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
//   label: PropTypes.string.isRequired,
//   filter: PropTypes.string.isRequired,
//   stroke: PropTypes.bool,
//   fill: PropTypes.string
// });

const propTypes = {
  option: TypeChartBar,
  setRef: PropTypes.func
};

const getPercent = value => {
  if (value >= 1) {
    return value.toFixed();
  }
  return "<1";
};

const Label = ({ classes, option, setRef }) => {
  const ItemLabelStyle = {
    ...(setRef && { opacity: 0 })
  };

  return (
    <div style={ItemLabelStyle} className={classes.root} ref={setRef && setRef}>
      <div>
        <TurbotIcon
          icon={option.icon}
          style={{ color: option.iconColor || option.backgroundColor }}
        />
        &nbsp;&nbsp;
        <span className={classes.label}>
          {option.value.toLocaleString("en")}&nbsp;
          {option.label}
        </span>
        &nbsp;&nbsp;
        <span className={classes.percentage}>{getPercent(option.chart)}%</span>
      </div>
    </div>
  );
};

Label.propTypes = propTypes;

export default withStyles(LabelStyles)(Label);
