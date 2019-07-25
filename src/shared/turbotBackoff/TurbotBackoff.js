import { withRouter } from "react-router-dom";
import React from "react";

class TurbotBackoff extends React.Component {
  static autoUpdateBackoff = 1.2;
  static maxInterval = 14400000;

  unlisten = null;

  state = {
    interval: this.props.interval || 60000
  };

  genNextInterval = () => {
    if (this.constructor.maxInterval <= this.state.interval) return;
    let tmpTimer = Number(
      (this.state.interval * this.constructor.autoUpdateBackoff).toFixed()
    );
    const interval = Math.min(this.constructor.maxInterval, tmpTimer);
    this.setState({
      interval: interval
    });
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.resetInterval();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  resetInterval = () => {
    this.setState({
      interval: this.props.interval || 60000
    });
  };

  render() {
    const { children, interval, ...rest } = this.props;
    return (
      <>
        {React.cloneElement(children, {
          resetInterval: this.resetInterval,
          interval: this.state.interval,
          genNextInterval: this.genNextInterval,
          ...rest
        })}
      </>
    );
  }
}

export default withRouter(TurbotBackoff);
