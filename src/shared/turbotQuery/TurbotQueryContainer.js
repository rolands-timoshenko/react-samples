import React from "react";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { logTime } from "../../utils/logging";

class TurbotQueryContainer extends PureComponent {
  timeoutId = null;

  staringInterval = 0;

  static propTypes = {
    client: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    data: PropTypes.any,
    refetch: PropTypes.func.isRequired,
    backoff: PropTypes.bool,
    interval: PropTypes.number,
    debug: PropTypes.bool
  };

  static defaultProps = {
    backoff: false,
    debug: false
  };

  componentWillUnmount() {
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  componentDidMount() {
    if (this.props.error) return;
    this._startInterval();
  }

  isIntervalValidNumber = number => {
    return typeof number === "number" && !isNaN(number);
  };

  _startInterval = () => {
    const { backoff, refetch, interval } = this.props;
    if (this.isIntervalValidNumber(interval) && !this.timeoutId && backoff) {
      // Lets store starting interval
      this.staringInterval = interval;
      this._handleRefetch(refetch);
    }
  };

  _handleRefetch = refetch => {
    // Lets be sure, before running async timeout, check if interval is number
    const interval = this.props.interval;
    if (
      !this.isIntervalValidNumber(interval) ||
      interval < this.staringInterval
    ) {
      throw "Interval should be number";
    }

    this.timeoutId = setTimeout(() => {
      this.props.debug && logTime(`#TurbotQuery - ${interval}`);
      // Call apollo Query refetch
      refetch();
      // Gen next interval
      this.props.genNextInterval();
      // will be executed with new interval
      this._handleRefetch(refetch);
    }, interval);
  };

  render() {
    const { client, loading, data, refetch, error, children } = this.props;

    const childrenProps = {
      client,
      loading,
      data,
      error,
      refetch
    };
    if (React.isValidElement(children)) return children;
    return children({ ...childrenProps });
  }
}

export default TurbotQueryContainer;
