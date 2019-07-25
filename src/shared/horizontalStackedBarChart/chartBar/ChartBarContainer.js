import { PropTypes } from "prop-types";
import React, { Component } from "react";
import ChartBar from "./ChartBar";
import { TypeChartBar } from "./ChartBar.types";

class ChartBarContainer extends Component {
  // Refs for popover position control
  popover = React.createRef();
  container = React.createRef();

  static propTypes = {
    option: TypeChartBar,
    onClick: PropTypes.func,
    styles: PropTypes.object
  };

  state = {
    // controls popover
    anchorEl: null,
    // controls popover position
    coords: null
  };

  getPopoverCoords(container, popover) {
    if (container && popover) {
      const containerDimension = container.getBoundingClientRect();
      const popoverDimension = popover.getBoundingClientRect();
      let pageX =
        containerDimension.x +
        containerDimension.width / 2 -
        popoverDimension.width / 2;

      // If popover goes over the screen, lets make it align the screen instead
      if (pageX < 0) pageX = 0;
      else if (
        pageX + popoverDimension.width >
        document.body.getBoundingClientRect().width
      ) {
        pageX =
          document.body.getBoundingClientRect().width - popoverDimension.width;
      }

      const pageY = containerDimension.y - popoverDimension.height - 2;
      return {
        pageX: pageX,
        pageY: pageY
      };
    }
    return null;
  }

  setPopoverRef = element => {
    this.popover.current = element;
    if (this.container.current && this.popover.current)
      this.setState({
        coords: this.getPopoverCoords(
          this.container.current,
          this.popover.current
        )
      });
  };

  setContainerRef = element => {
    this.container.current = element;
  };

  handleMouseOver = evt => {
    this.setState({
      anchorEl: evt.currentTarget
    });
  };

  handleMouseLeave = () => {
    this.setState({
      anchorEl: null,
      coords: null
    });
  };

  handleClick = () => {
    this.props.onClick(this.props.option);
  };

  render() {
    const { option, styles } = this.props;
    return (
      <ChartBar
        option={option}
        anchorEl={this.state.anchorEl}
        coords={this.state.coords}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        setContainerRef={this.setContainerRef}
        setPopoverRef={this.setPopoverRef}
        styles={styles}
      />
    );
  }
}

export default ChartBarContainer;
