import React, { Component } from "react";
import PropTypes from "prop-types";

class TurbotClickable extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired
  };

  handleClick = () => {};

  render() {
    return <span onClick={this.handleClick}>{this.props.children}</span>;
  }
}

export default TurbotClickable;
