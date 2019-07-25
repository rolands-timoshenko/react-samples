import PropTypes from "prop-types";
import React, { Component } from "react";
import * as d3 from "d3";
import { withStyles } from "@material-ui/core";
import TurbotArrowStyles from "./TurbotArrow.styles";

export const TypeArrowDirection = PropTypes.oneOf([
  "left",
  "right",
  "up",
  "down"
]);

class TurbotArrow extends Component {
  static propTypes = {
    direction: TypeArrowDirection,
    parentRef: PropTypes.object
  };

  get parentWidth() {
    return `${this.props.parentRef.clientWidth}`;
  }

  componentDidMount() {
    this.svg = d3.select(this.refs.container);

    switch (this.props.direction) {
      case "left":
      case "right":
        this.svg
          .attr("class", `${this.props.classes.svg}`)
          .attr("width", `${this.props.parentRef.clientWidth}px`)
          .attr("height", `15px`);
        break;
      case "down":
      case "up":
        this.svg
          .attr("class", `${this.props.classes.svg}`)
          .attr("height", `${this.props.parentRef.clientWidth}px`)
          .attr("width", `15px`);
        break;
      default:
        throw new Error("arrow direction undefined");
    }

    this.addSvgDefs(this.svg);

    const pathCoords = this.getPathCoords(this.props.direction);
    if (pathCoords) {
      const pathData = this.getPathData(pathCoords);
      this.drawArrowPath(pathData);
    }
  }

  componentDidUpdate() {
    this.updateContainerWidth();

    this.svg.selectAll(`.arrow-line`).remove();

    const pathCoords = this.getPathCoords(this.props.direction);
    if (pathCoords) {
      const pathData = this.getPathData(pathCoords);
      this.drawArrowPath(pathData);
    }
  }

  drawArrowPath = pathData => {
    this.svg
      .append("path")
      .attr("d", pathData)
      .attr("class", "arrow-line")
      .attr("marker-end", "url(#arrow)");
  };

  updateContainerWidth = () => {
    this.svg.attr("width", `${this.props.parentRef.clientWidth}px`);
  };

  getPathCoords = direction => {
    switch (direction) {
      case "left":
        return [[this.props.parentRef.clientWidth - 15, 7], [15, 7]];
      case "right":
        return [[15, 7], [this.props.parentRef.clientWidth - 15, 7]];
      case "down":
        return [[7, 15], [7, this.props.parentRef.clientHeight - 15]];
      case "up":
        return [[7, this.props.parentRef.clientHeight - 15], [7, 15]];
      default:
        return null;
    }
  };

  getPathData = cords => {
    return d3.line()(cords);
  };

  addSvgDefs = svg => {
    const defs = svg.append("defs");
    const marker = defs
      .append("svg:marker")
      .attr("id", "arrow")
      .attr("markerHeight", 12)
      .attr("markerWidth", 12)
      .attr("markerUnits", "strokeWidth")
      .attr("orient", "auto")
      .attr("refX", 4)
      .attr("refY", 2.5)
      .attr("viewBox", "0 0 12 12");
    marker
      .append("path")
      .attr("d", "M0,0 L5,2.5 L0,5 Z")
      .attr("fill", "#f00")
      .attr("class", "arrowHead");
  };

  render() {
    return <svg ref="container" />;
  }
}

export default withStyles(TurbotArrowStyles)(TurbotArrow);
