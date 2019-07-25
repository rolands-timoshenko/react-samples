import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import withClient from "../../hoc/withClient";
import { ListQueryContext } from "../../hoc/withScopeFilterListQuery";
import { TypeErrorHandler } from "./../turbotErrorHandler/TurbotErrorHandlerConsumer";

class TurbotListPolling extends React.Component {
  timeoutId;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.terminate !== prevState.terminate)
      return {
        terminate: nextProps.terminate
      };
    return null;
  }

  static propTypes = {
    query: PropTypes.any.isRequired,
    dataFetchKey: PropTypes.string.isRequired,
    terminate: PropTypes.bool,
    pollingInterval: PropTypes.number,
    errorHandler: TypeErrorHandler
  };

  static defaultProps = {
    pollingInterval: 1000
  };

  state = {
    terminate: null,
    list: [],
    poll: null,
    processing: false,
    filter: null,
    error: null
  };

  setProcessing = async processing => {
    return new Promise(resolve => {
      this.setState(
        {
          processing: processing
        },
        resolve
      );
    });
  };

  setError = async error => {
    return new Promise(resolve => {
      this.setState(
        {
          error: error
        },
        resolve
      );
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  handleLoadMore = async (variables = {}, reload = true) => {
    // If api request is in process return
    if (this.state.terminate || this.state.processing) {
      return;
    }

    try {
      this.setError(null);
      this.setProcessing(true);

      this.timeoutId && clearTimeout(this.timeoutId);

      const { data } = await this.props.client.query({
        query: this.props.query,
        variables: {
          ...variables,
          paging: !reload ? this.state.poll : null
        }
      });

      await new Promise(resolve => {
        const key = this.props.dataFetchKey;
        this.setState(
          prevState => {
            const list =
              reload || !this.state.poll
                ? [...data[key].items]
                : [...prevState.list, ...data[key].items];
            const poll = data[key].paging.poll;
            return {
              list,
              poll
            };
          },
          () => {
            resolve();
          }
        );
      });

      if (this.state.terminate) return;
      if (this.state.error) return;

      this.timeoutId = setTimeout(() => {
        this.handleLoadMore(variables, false);
      }, this.props.pollingInterval);
    } catch (e) {
      this.setError("Error running query");
    } finally {
      this.setProcessing(false);
    }
  };

  getContext = () => {
    return {
      error: this.state.error,
      processing: this.state.processing,
      next: Boolean(this.state.next),
      listCount: this.state.list.length
    };
  };

  render() {
    return (
      <ListQueryContext.Provider value={this.getContext()}>
        {React.cloneElement(this.props.children, {
          data: this.state.response,
          list: this.state.list,
          onLoad: this.handleLoadMore,
          terminatePolling: this.terminatePolling
        })}
      </ListQueryContext.Provider>
    );
  }
}

const enhance = compose(
  withRouter,
  withClient
);

export default enhance(TurbotListPolling);
