import React from "react";
import ChartBarContainer from "./chartBar/ChartBarContainer";
import Grid from "@material-ui/core/Grid";
import HorizontalStackedBarChartStyles from "./HorizontalStackedBarChart.styles";
import PropTypes from "prop-types";
import { TypeChartBar } from "./chartBar/ChartBar.types";
import { withStyles } from "@material-ui/core";

const propTypes = {
  data: PropTypes.arrayOf(TypeChartBar).isRequired
};

const totalControls = items => {
  if (items == null) {
    return 0;
  }
  return items.reduce(function(a, b) {
    return b.value == null ? a : a + b.value;
  }, 0);
};

const AddChartCssWidth = (data, min = 2) => {
  // Recalculate percetage as exp
  const dataWithExp = data.map(item => {
    // Do all math exp manipulations here
    item.chartAsExp = item.chart < 1 ? min : item.chart + min / item.chart;
    return item;
  });

  const totalExp = dataWithExp.reduce(function(a, b) {
    return b.chartAsExp == null ? a : a + b.chartAsExp;
  }, 0);

  let maxPercentage = 100;

  return dataWithExp.map((item, index) => {
    item.width = Number((item.chartAsExp / totalExp) * 100);
    maxPercentage = maxPercentage - item.chart;
    if (dataWithExp.length === index + 1 && maxPercentage !== 0) {
      item.width = item.width + maxPercentage;
    }
    return item;
  });
};

const HorizontalStackedBarChart = ({
  classes,
  style,
  barStyles,
  data,
  onClick
}) => {
  const nonZeroData = data.filter(d => d.value > 0);
  const total = totalControls(nonZeroData);

  let maxPercentage = 100;

  const dataWithPercents = AddChartCssWidth(
    nonZeroData.map((item, index) => {
      item.chart = Number((item.value / total) * 100);
      maxPercentage = maxPercentage - item.chart;
      if (nonZeroData.length === index + 1 && maxPercentage !== 0) {
        item.chart = item.chart + maxPercentage;
      }
      return item;
    })
  );

  return (
    <Grid item xs={12}>
      <div className={classes.root} style={style}>
        {dataWithPercents.map((option, index) => (
          <ChartBarContainer
            key={option.label}
            option={option}
            onClick={onClick}
            styles={barStyles}
          />
        ))}
      </div>
    </Grid>
  );
};

HorizontalStackedBarChart.propTypes = propTypes;

export default withStyles(HorizontalStackedBarChartStyles)(
  HorizontalStackedBarChart
);
