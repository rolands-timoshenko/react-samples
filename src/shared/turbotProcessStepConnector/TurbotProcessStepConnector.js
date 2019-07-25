import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ReactResizeDetector from "react-resize-detector";
import TurbotArrow from "../turbotArrow/TurbotArrow";
import TurbotProcessStepConnectorStyles from "./TurbotProcessStepConnector.styles";

const TypeConnectorDirection = PropTypes.oneOf(["left", "right"]);

class TurbotProcessStepConnector extends React.Component {
  static propTypes = {
    directions: PropTypes.arrayOf(TypeConnectorDirection)
  };

  state = {
    ref: null
  };

  componentDidMount() {
    this.setState({
      ref: this.refs.container
    });
  }

  handleResize = () => {
    this.setState({
      ref: this.refs.container
    });
  };

  renderArrows = () => {
    return (
      <Fragment>
        {this.props.directions.map((dir, index) => (
          <TurbotArrow direction={dir} parentRef={this.state.ref} key={index} />
        ))}
      </Fragment>
    );
  };

  render() {
    return (
      <div className={this.props.classes.root} ref="container">
        {this.state.ref && this.renderArrows()}
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.handleResize}
        />
      </div>
    );
  }
}

export default withStyles(TurbotProcessStepConnectorStyles)(
  TurbotProcessStepConnector
);
