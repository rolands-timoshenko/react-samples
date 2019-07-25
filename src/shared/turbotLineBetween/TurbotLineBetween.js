import { PropTypes } from "prop-types";
import React, { Component } from "react";
import * as d3 from "d3";
import { withStyles } from "@material-ui/core";
import TurbotLineBetweenStyles from "./TurbotLineBetween.styles";
import ReactResizeDetector from "react-resize-detector";

class TurbotLineBetween extends Component {
  svg = null;

  from = null;
  fromCoords = null;

  to = null;
  toCoords = null;

  static propTypes = {
    from: PropTypes.any,
    to: PropTypes.any,
    // Need to trigger re-render
    data: PropTypes.any
  };

  findSvgCoords = (loc1, loc2) => {
    const x = this.findSvgLeft(loc1, loc2);
    const y = this.findSvgTop(loc1, loc2);
    const w = this.findSvgWidth(loc1, loc2);
    const h = this.findSvgHeight(loc1, loc2);
    return [x, y, w, h];
  };

  findSvgTop = (loc1, loc2) => {
    const g = Math.abs(loc1.top - loc2.top) < loc1.height;
    if (g && loc1.top > loc2.top) return loc2.top;
    if (g && loc1.top < loc2.top) return loc1.top;
    if (loc1.top > loc2.top) return loc2.top + loc2.height;
    return loc1.top;
  };

  findSvgLeft = (loc1, loc2) => {
    if (loc1.left > loc2.left) return loc2.left + loc2.width;
    if (loc1.left < loc2.left) return loc1.left + loc1.width;
    return loc1.left;
  };

  findSvgWidth = (loc1, loc2) => {
    if (Math.abs(loc1.top - loc2.top) < loc1.height || loc1.top === loc2.top) {
      return Math.abs(loc1.left + loc1.width - loc2.left);
    }
    return Math.abs(loc1.left + loc1.width - (loc2.left + loc2.width));
  };

  findSvgHeight = (loc1, loc2) => {
    if (Math.abs(loc1.top - loc2.top) < loc1.height) {
      if (loc1.top > loc2.top) {
        return Math.abs(loc1.top + loc1.height - loc2.top);
      }
      if (loc1.top < loc2.top) {
        return Math.abs(loc2.top + loc2.height - loc1.top);
      }
    } else {
      return Math.abs(loc1.top - loc2.top);
    }
  };

  findLineStartingPoint = (fromCoords, toCoords, svgCoords) => {
    let x = (() => {
      return fromCoords.left + fromCoords.width - svgCoords.left + 20;
    })();
    let y = (() => {
      return fromCoords.top - fromCoords.top + fromCoords.height / 2;
    })();
    return [x, y];
  };

  findLineEndPoint = (fromCoords, toCoords, svgCoords, lineCoords) => {
    const g = Math.abs(fromCoords.top - toCoords.top) < fromCoords.height;
    const [lastX, lastY] = lineCoords.pop();
    if (g) {
      return [svgCoords.width - 20, lastY];
    } else {
      return [lastX, svgCoords.height - 20];
    }
  };

  findLineMiddlePoints = (fromCoords, toCoords, svgCoords, lineCoords) => {
    const [lastX, lastY] = lineCoords.pop(); // eslint-disable-line no-unused-vars
    const points = [];
    const g = Math.abs(fromCoords.top - toCoords.top) < fromCoords.height;
    if (!g) {
      points.push([svgCoords.width - toCoords.width + 40, lastY]);
    }
    return points;
  };

  setSvgCoords = (x, y, w, h) => {
    this.svg
      .style("width", `${w}px`)
      .style("height", `${h}px`)
      .style("top", `${y}px`)
      .style("left", `${x}px`);
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
      // .attr("d", "M0 0,C2,2 4,4 8,6 8,6 4,8 0,12 0,12 1,8 2,6 2,6 1,4 0,0 Z")
      .attr("fill", "#f00")
      .attr("class", "arrowHead");
  };

  getElementCoordsAccordingParent = (el, parent) => {
    const elCoords = el.getBoundingClientRect();
    const parentCoords = parent.getBoundingClientRect();
    return {
      top: Math.abs(parentCoords.top - elCoords.top),
      left: Math.abs(parentCoords.left - elCoords.left),
      width: elCoords.width,
      height: elCoords.height
    };
  };

  drawSvg = () => {
    const { classes, from, to } = this.props;

    // select / find both elements. Can be ref or selector
    this.from = d3.select(from);
    this.to = d3.select(to);
    if (!this.from.node() || !this.to.node()) {
      d3.selectAll(`.${classes.svg}`).remove();
      return;
    }

    // Remove all svg's
    d3.selectAll(`.${classes.svg}`).remove();

    // Get element coordinates
    const fromCoords = this.getElementCoordsAccordingParent(
      this.from.node(),
      this.refs.container
    );
    const toCoords = this.getElementCoordsAccordingParent(
      this.to.node(),
      this.refs.container
    );

    // Create / append svg into body. Set class, so later they cant be founded and removed
    this.svg = d3
      .select(this.refs.container)
      .append("svg")
      .attr("class", classes.svg);

    // Add custom markers
    this.addSvgDefs(this.svg);

    // Find coordinates for svg depending from element1 and element2
    const [x, y, w, h] = this.findSvgCoords(fromCoords, toCoords);

    // Set svg coords
    this.setSvgCoords(x, y, w, h);

    // Lets draw a line
    this.drawLine();
  };

  drawLine = () => {
    const lineGenerator = d3.line();

    // To draw a line we need all 3 element coords
    const fromCoords = this.from.node().getBoundingClientRect();
    const toCoords = this.to.node().getBoundingClientRect();
    const svgCoords = this.svg.node().getBoundingClientRect();

    const lineCoords = [];

    // Lets find starting point
    lineCoords.push(
      this.findLineStartingPoint(fromCoords, toCoords, svgCoords)
    );

    // Lets find middle points
    lineCoords.push(
      ...this.findLineMiddlePoints(fromCoords, toCoords, svgCoords, [
        ...lineCoords
      ])
    );

    // Lets find final point
    lineCoords.push(
      this.findLineEndPoint(fromCoords, toCoords, svgCoords, [...lineCoords])
    );

    this.lineCoords = lineCoords;

    const pathData = lineGenerator(lineCoords);

    // Lets draw a line with marker
    this.svg
      .append("path")
      .attr("d", pathData)
      .attr("marker-end", "url(#arrow)");
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.drawSvg);
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentDidMount() {
    const { from, to } = this.props;

    // 1. select / find both elements. Can be ref or selector
    this.from = d3.select(from);
    this.to = d3.select(to);

    // If one of elements is missing, do not continue
    if (!this.from.node() || !this.to.node()) {
      return;
    }

    // This one ensure that svg will be drawed only after all dom rendered
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.drawSvg();
      });
    }, 0);
  }

  onResize = () => {
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.drawSvg();
      });
    }, 0);
  };

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root} ref="container">
        {children}
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </div>
    );
  }
}

export default withStyles(TurbotLineBetweenStyles)(TurbotLineBetween);
