import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import StrokeBg from "../horizontalStackedBarChart/chartBar/strokeBg/StrokeBg";
let c3;
let d3;

class TurbotChartsContainer extends React.Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
      title: PropTypes.object,
      size: PropTypes.object,
      padding: PropTypes.object,
      color: PropTypes.object,
      interaction: PropTypes.object,
      transition: PropTypes.object,
      oninit: PropTypes.func,
      onrendered: PropTypes.func,
      onmouseover: PropTypes.func,
      onmouseout: PropTypes.func,
      onresize: PropTypes.func,
      onresized: PropTypes.func,
      axis: PropTypes.object,
      grid: PropTypes.object,
      regions: PropTypes.array,
      legend: PropTypes.object,
      tooltip: PropTypes.object,
      subchart: PropTypes.object,
      zoom: PropTypes.object,
      point: PropTypes.object,
      line: PropTypes.object,
      area: PropTypes.object,
      bar: PropTypes.object,
      pie: PropTypes.object,
      donut: PropTypes.object,
      gauge: PropTypes.object,
      className: PropTypes.string,
      style: PropTypes.object,
      unloadBeforeLoad: PropTypes.bool,
      onPropsChanged: PropTypes.func
    };
  }

  componentDidMount() {
    c3 = require("c3");
    d3 = require("d3");

    const stripeBg = this.props.stripeBg;

    c3.chart.internal.fn.afterInit = () => {
      if (stripeBg) {
        stripeBg.forEach(item => {
          d3.select("defs")
            .append("pattern")
            .attr("id", item.key)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", 10)
            .attr("height", 10)
            .append("image")
            .attr("xlink:href", `${this.getStripeBackground(item.value)}`)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10);
        });
      }
    };
    this.updateChart(this.props);
  }

  getStripeBackground = color => {
    const svgString = color =>
      encodeURIComponent(renderToStaticMarkup(<StrokeBg color={color} />));

    const dataImage = color => `data:image/svg+xml,${svgString(color)}`;
    return dataImage(color);
  };

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
    if (newProps.onPropsChanged) {
      newProps.onPropsChanged(this.props, newProps, this.chart);
    }
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  destroyChart() {
    try {
      this.chart = this.chart.destroy();
    } catch (err) {
      throw new Error("Internal C3 error", err);
    }
  }

  generateChart(mountNode, config) {
    const newConfig = Object.assign({ bindto: mountNode }, config);
    return c3.generate(newConfig);
  }

  loadNewData(data) {
    this.chart.load(data);
  }

  unloadData() {
    this.chart.unload();
  }

  updateChart(config) {
    if (!this.chart) {
      this.chart = this.generateChart(findDOMNode(this), config);
    }

    if (config.unloadBeforeLoad) {
      this.unloadData();
    }

    this.loadNewData(config.data);
  }

  render() {
    const className = this.props.className ? ` ${this.props.className}` : "";
    const style = this.props.style ? this.props.style : {};
    return <div className={className} style={style} />;
  }
}

export default TurbotChartsContainer;
