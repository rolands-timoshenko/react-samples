import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import turbotTheme from "../../theme";
import { withStyles } from "@material-ui/core";
import * as d3 from "d3";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactResizeDetector from "react-resize-detector";
import Label from "../horizontalStackedBarChart/chartBar/label/Label";
import StrokeBg from "../horizontalStackedBarChart/chartBar/strokeBg/StrokeBg";
import TurbotChartStackedBarStyles from "./TurbotChartStackedBar.styles";

class TurbotChartStackedBarContainer extends Component {
  svg = null;
  actualWidth = 0;
  sideChartRatioInPixels = [];
  sideCharts = null;
  defs = null;
  tooltip = null;

  state = {
    data: [],
    totals: []
  };

  static width = "100%";
  static height = "36";
  static minChartWidth = 35;

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          backgroundColor: PropTypes.string,
          borderColor: PropTypes.string,
          filter: PropTypes.string,
          // FIXME: change to TypeIcon
          icon: PropTypes.any,
          iconColor: PropTypes.string,
          label: PropTypes.string,
          turbotId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          value: PropTypes.number
        })
      )
    ).isRequired,
    totals: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired
  };

  static getRatioInPixels = (svgWidth, totals, minChartWidth) => {
    let sum = totals.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    const scale = d3
      .scaleLinear()
      .domain([0, sum])
      .range([minChartWidth, svgWidth - minChartWidth])
      .nice();

    return totals.map(item => scale(item));
  };

  static getPowPercentage = (dataMax, dataMin, min, max) => {
    const ratio = dataMin / dataMax;
    if (ratio > max) {
      return max;
    }
    if (ratio < min) {
      return min;
    }
    return ratio;
  };

  static getSumByKey = (data, key) => {
    return data
      .map(item => item[key])
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  };

  static getChartSliceWidths = (data, max, elWidth) => {
    // Lets make a copy of data
    const widths = JSON.parse(JSON.stringify(data));

    // Get sum of data
    const dataMax = widths.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    // Lets find out pow percentage depend on biggest chart total and current chart total
    const percentage = TurbotChartStackedBarContainer.getPowPercentage(
      max,
      dataMax,
      0.5,
      1
    );

    const powScale = d3
      .scalePow()
      .exponent(percentage)
      .domain([0, max])
      .range([0, max]);

    // Get chart new value
    const newChartWidth = powScale(dataMax);

    const linearScale = d3
      .scaleLinear()
      .domain([0, dataMax])
      .range([0, newChartWidth]);

    // Lets adapt data to new chart width
    const linearScaledData = widths.map(item => linearScale(item));

    const pixelScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, elWidth])
      .nice();

    // Lets transform chart data to pixels
    const dataInPixels = linearScaledData.map(item => pixelScale(item));

    // Lets find out chart pixels total
    const totalPixels = dataInPixels.reduce((accum, curr) => accum + curr, 0);
    // Now rescale existing pixels data to ensure that all data is visible and each piece of chart is not less than ...
    const rangeMin = 5;
    const rangeMax =
      totalPixels - rangeMin < rangeMin ? rangeMin : totalPixels - rangeMin;
    const reScaleAccordingToMinItemWidth = d3
      .scaleLinear()
      .domain([0, totalPixels])
      .range([rangeMin, rangeMax])
      .nice();
    const d = dataInPixels.map(item => reScaleAccordingToMinItemWidth(item));
    return dataInPixels.map(item => reScaleAccordingToMinItemWidth(item));
  };

  static getTotalValues = chartData => {
    return chartData.reduce(function(a, b) {
      return b.value == null ? a : a + Math.abs(b.value);
    }, 0);
  };

  static findLowestValue = chartData => {
    const values = [];
    chartData.forEach(
      val => val.value !== null && val.value > 0 && values.push(val.value)
    );
    return Math.min(...values);
  };

  static getMaxTotals = data => {
    let sideSums = [[], []];
    data.forEach(dataset => {
      dataset.forEach((group, index) => {
        const total = TurbotChartStackedBarContainer.getTotalValues(group);
        sideSums[index].push(total);
      });
    });
    return [Math.max(...sideSums[0]), Math.max(...sideSums[1])];
  };

  static getStripeBackground = color => {
    const svgString = color =>
      encodeURIComponent(renderToStaticMarkup(<StrokeBg color={color} />));

    const dataImage = color => `data:image/svg+xml,${svgString(color)}`;
    return dataImage(color);
  };

  static removeZeroValues = data =>
    data.map(chart => chart.filter(item => item.value > 0));

  static addChartPercentage = data => {
    let maxPercentage = 100;
    let total = 0;
    let length = 0;
    let index = 0;

    data.forEach(chart => {
      total += TurbotChartStackedBarContainer.getTotalValues(chart);
    });

    data.forEach(chart => (length += chart.length));

    return data.map(chart =>
      chart.map(item => {
        index++;
        item.chart = Math.floor((item.value / total) * 100);
        maxPercentage = maxPercentage - item.chart;
        if (length === index && maxPercentage !== 0) {
          item.chart = item.chart + maxPercentage;
        }
        return item;
      })
    );
  };

  drawChartLabel = (el, label, index) => {
    const y = 36;
    const xAxisPad = 8;
    const elWidth = Number(el.node().getAttribute("width"));
    const text = el
      .append("text")
      .attr("y", y)
      .attr("class", this.props.classes.chartText)
      .text(label.toLocaleString("en"));

    let elSize = text.node().getBoundingClientRect();

    // Depending from index 0 or 1 choose how to position label
    if (index === 0) {
      text.attr("transform", el => {
        return `translate(${elWidth - elSize.width - xAxisPad})`;
      });
    } else {
      text.attr("transform", el => {
        return `translate(${xAxisPad})`;
      });
    }
  };

  drawSideCharts = () => {
    const self = this;
    this.sideCharts.each(function(item, index) {
      // Left side chart goes from right to left, right side goes form left to right.
      // So lets reverse first item (left side chart) so its sorted according to data
      const data = self.state.data[index];
      const el = d3.select(this);
      self.drawSideChart(el, data, index, self.state.totals[index]);
    });
  };

  drawSideChart = (el, data, index, total) => {
    if (data.length === 0) return;
    const self = this;
    // Get parent element width from attr.
    const elWidth = Number(el.node().getAttribute("width"));
    // Calculate scale
    const chartWidths = this.constructor.getChartSliceWidths(
      data.map(item => item["value"]),
      total,
      // This one fix cut of from last chart slice
      elWidth - 2
    );

    // Height could be taken from config
    const elHeight = 9;
    // Store already used chart space. If index is 0 it's left chart, so it should start from right
    let accoupied = index === 0 ? elWidth : 0;
    // Lets get all side chart value sum
    const sum = this.constructor.getTotalValues(data);
    // Lets draw label
    this.drawChartLabel(el, sum, index, "chart-label");
    // Lets draw each bar chart
    el.selectAll("rect")
      // Filter data by value. It should be more then zero
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return 10;
      })
      .attr("x", function(d, i) {
        const width = chartWidths[i];
        // TODO: find better way to calculate starting point
        const startFrom = index === 0 ? accoupied - width : accoupied;

        if (index === 0) accoupied -= width;
        else accoupied += width;

        return startFrom;
      })
      .attr("height", function(d, i) {
        return elHeight;
      })
      .attr("width", function(d, i) {
        return chartWidths[i];
      })
      .attr("style", d => {
        if (d.stroke) {
          return `fill:url(#stroke-${d.backgroundColor});stroke-width:1;stroke:${d.borderColor}`;
        } else {
          return `fill:${d.backgroundColor};stroke-width:1;stroke:${d.borderColor}`;
        }
      })
      .attr("class", this.props.classes.chart)
      .on("mouseover", function(data) {
        const el = d3.select(this).node();
        self.handleMouseOver(el, data);
      })
      .on("mouseout", function(data) {
        const el = d3.select(this).node();
        self.handleMouseOut(el, data);
      })
      .on("click", function(data) {
        const el = d3.select(this).node();
        self.handleMouseClick(el, data);
      });
  };

  handleMouseOver = (el, data) => {
    const elCords = el.getBoundingClientRect();
    const tooltipContent = this.renderLabelPopup(data);
    this.tooltip.html(tooltipContent);
    const tooltipCords = this.tooltip.node().getBoundingClientRect();
    this.tooltip
      .style("opacity", 1)
      .style("top", `${elCords.top - tooltipCords.height - 3}px`)
      .style(
        "left",
        `${elCords.left + elCords.width / 2 - tooltipCords.width / 2}px`
      );
  };

  handleMouseOut = (el, data) => {
    this.tooltip.style("opacity", 0);
    this.tooltip.html("");
  };

  handleMouseClick = (el, data) => {
    this.props.onClick(data);
  };

  renderLabelPopup = data => {
    const options = {
      color: data.iconColor,
      value: data.value.toLocaleString("en"),
      icon: data.icon,
      label: data.label,
      filter: data.filter,
      chart: data.chart,
      iconColor: data.iconColor,
      backgroundColor: "white",
      borderColor: data.borderColor
    };

    const html = renderToStaticMarkup(
      <MuiThemeProvider theme={turbotTheme}>
        <Label option={options} />
      </MuiThemeProvider>
    );

    return html;
  };

  drawLineForSplittingContainers = () => {
    // FIXME: temp solution for improving resize
    this.svg.selectAll("line").remove();
    this.svg
      .append("line")
      .attr("x1", this.sideChartRatioInPixels[0])
      .attr("x2", this.sideChartRatioInPixels[0])
      .attr("y1", 3)
      .attr("y2", 34)
      .attr("style", "stroke:#7e7f7f;stroke-width:1");
  };

  drawContainersForSideCharts = () => {
    // FIXME: temp solution for improving resize
    this.svg.selectAll("svg").remove();
    const self = this;
    this.sideCharts = this.svg
      .selectAll("svg")
      .data([...self.state.data])
      .enter()
      .append("svg")
      .attr("height", function(d, i) {
        return self.constructor.height;
      })
      .attr("width", (d, i) => {
        // console.info(self.sideChartRatioInPixels[i]);
        return self.sideChartRatioInPixels[i];
      })
      .attr("y", function(d) {
        return 0;
      })
      .attr("x", (d, i, e) => {
        return i === 0 ? 0 : self.sideChartRatioInPixels[i - 1];
      });
  };

  drawBgStripeImages = () => {
    // FIXME: temp solution for improving resize
    this.svg.selectAll("defs").remove();
    this.defs = this.svg.append("defs");
    this.state.data.forEach(chartData => {
      chartData.forEach(item => {
        this.defs
          .append("pattern")
          .attr("id", `stroke-${item.backgroundColor}`)
          .attr("patternUnits", "userSpaceOnUse")
          .attr("width", 10)
          .attr("height", 10)
          .append("image")
          .attr(
            "xlink:href",
            `${this.constructor.getStripeBackground(item.backgroundColor)}`
          )
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 10)
          .attr("height", 10);
      });
    });
  };

  drawTooltip = () => {
    // FIXME: temp solution for improving resize
    this.svg.selectAll(`.${this.props.classes.tooltip}`).remove();
    this.tooltip = d3
      .select(this.refs.container)
      .append("div")
      .attr("class", this.props.classes.tooltip);
  };

  reDrawChart = () => {
    // Get main svg container width in pixels
    this.actualWidth = this.svg.node().getBoundingClientRect().width;

    // Get both side chart bar size (width) in pixels
    this.sideChartRatioInPixels = this.constructor.getRatioInPixels(
      this.actualWidth,
      this.state.totals,
      this.constructor.minChartWidth
    );

    this.drawTooltip();

    this.drawBgStripeImages();

    this.drawContainersForSideCharts();

    this.drawLineForSplittingContainers();

    this.drawSideCharts();
  };

  drawChart = () => {
    // Create main svg container
    this.svg = d3
      .select(this.refs.container)
      .append("svg")
      .attr("width", this.constructor.width)
      .attr("height", this.constructor.height);

    this.reDrawChart();
  };

  componentDidMount() {
    // FIXME: remove it. only for testing purposes
    window._d3 = d3;

    const { totals, data } = this.props;

    let withoutZeros = this.constructor.removeZeroValues(data);

    let withPercentage = this.constructor.addChartPercentage(withoutZeros);

    this.setState(
      {
        data: withPercentage,
        totals: totals
      },
      this.drawChart
    );
  }

  render() {
    return (
      <div>
        <div className={this.props.classes.container} ref="container" />
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.reDrawChart}
        />
      </div>
    );
  }
}

export default withStyles(TurbotChartStackedBarStyles)(
  TurbotChartStackedBarContainer
);
