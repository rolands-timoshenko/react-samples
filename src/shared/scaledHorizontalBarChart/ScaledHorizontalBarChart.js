import React, { Component } from "react";
import ScaledHorizontalBarChartStyles from "./ScaledHorizontalBarChart.styles";
import { withStyles } from "@material-ui/core";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import * as d3 from "d3";
import ReactResizeDetector from "react-resize-detector";

export const ClickTypes = Object.freeze({
  RECENT: "recent",
  TOTALS: "totals",
  CHART: "chart"
});

const TypeChartItem = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
});

const TypeChartData = PropTypes.shape({
  recent: TypeChartItem.isRequired,
  total: TypeChartItem.isRequired
});

class ScaledHorizontalBarChart extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    data: TypeChartData.isRequired,
    onClick: PropTypes.func
  };

  get showTotal() {
    return this.props.data.total.value > 0;
  }

  get showRecent() {
    return this.props.data.recent.value > 0;
  }

  get totalContainerStyle() {
    const { data } = this.props;
    return {
      border: `1px solid ${data.total.borderColor}`,
      backgroundColor: `${data.total.backgroundColor}`
    };
  }

  get recentContainerStyle() {
    const { data } = this.props;
    return {
      border: `1px solid ${data.recent.borderColor}`,
      backgroundColor: `${data.recent.backgroundColor}`
    };
  }

  handleClick = (evt, type) => {
    evt.stopPropagation();
    this.props.onClick(type);
  };

  drawChart = () => {
    const { max, data } = this.props;
    const width = this.refs.container.clientWidth;
    const scale = d3
      .scalePow()
      .exponent(0.7)
      .domain([0, max])
      .range([0, width]);

    if (this.refs.recent) {
      if (data.total.value < data.recent.value)
        this.refs.recent.style.width = `${scale(data.total.value)}px`;
      else this.refs.recent.style.width = `${scale(data.recent.value)}px`;
    }

    if (this.refs.total)
      this.refs.total.style.width = `${scale(data.total.value)}px`;
  };

  debounceResize = debounce(() => this.drawChart(), 100);

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.setSize();
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
        ref="container"
        onClick={e => this.handleClick(e, ClickTypes.CHART)}
      >
        {this.showTotal && (
          <div
            onClick={e => this.handleClick(e, ClickTypes.TOTALS)}
            style={this.totalContainerStyle}
            ref="total"
            className={classes.total}
          />
        )}
        {this.showRecent && (
          <div
            onClick={e => this.handleClick(e, ClickTypes.RECENT)}
            style={this.recentContainerStyle}
            ref="recent"
            className={classes.recent}
          />
        )}
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.drawChart}
        />
      </div>
    );
  }
}

export default withStyles(ScaledHorizontalBarChartStyles)(
  ScaledHorizontalBarChart
);
