import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotDrawer from "./TurbotDrawer";

class TurbotDrawerContainer extends Component {
  static propTypes = {
    draggable: PropTypes.bool,
    toolbar: PropTypes.any
  };

  defaultWidth = 300;
  minWidth = 275;
  maxWidth = 600;

  state = {
    isResizing: false,
    lastDownX: 0,
    width: this.defaultWidth
  };

  handleMousedown = e => {
    this.setState({ isResizing: true, lastDownX: e.clientX });
  };

  handleMouseup = e => {
    this.setState({ isResizing: false });
  };

  handleMousemove = e => {
    if (!this.state.isResizing) {
      return;
    }
    let offsetRight = e.clientX + 3;
    if (offsetRight > this.minWidth && offsetRight < this.maxWidth) {
      this.setState({ width: offsetRight }, () => {});
    }
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMousemove);
    document.addEventListener("mouseup", this.handleMouseup);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMousemove);
    document.removeEventListener("mouseup", this.handleMouseup);
  }

  render() {
    const { children, toolbar, draggable } = this.props;
    const { width } = this.state;
    return (
      <TurbotDrawer
        width={width}
        onMouseDown={this.handleMousedown}
        draggable={draggable}
      >
        {children}
      </TurbotDrawer>
    );
  }
}

export default TurbotDrawerContainer;
