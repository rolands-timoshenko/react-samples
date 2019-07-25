import { isEmpty, isEqual } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { compose } from "redux";
import withClient from "../../hoc/withClient";
import TurbotBackoff from "../turbotBackoff/TurbotBackoff";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import TurbotQueryContainer from "./TurbotQueryContainer";

class TurbotQuery extends Component {
  static propTypes = {
    // Should come from hoc
    errorHandler: PropTypes.any.isRequired,
    // Should come from hoc
    client: PropTypes.any.isRequired,
    // qraphql query
    query: PropTypes.any.isRequired,
    variables: PropTypes.object,
    backoff: PropTypes.bool,
    debug: PropTypes.bool,
    refreshInterval: PropTypes.number,
    fetchPolicy: PropTypes.string
  };

  static defaultProps = {
    backoff: false,
    debug: false,
    refreshInterval: null,
    variables: {}
  };

  state = {
    data: {},
    processing: false,
    error: null
  };

  get loading() {
    return this.state.processing && isEmpty(this.state.data);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextState, this.state)) {
      return true;
    }
    if (!isEqual(nextProps.variables, this.props.variables)) {
      return true;
    }
    return false;
  }

  setStateAsync = async state => {
    return new Promise(resolve => {
      this.setState(prevState => ({ ...prevState, ...state }), resolve);
    });
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.variables, this.props.variables)) this.fetch();
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    try {
      if (this.state.error) return;
      await this.setStateAsync({ processing: true });
      const { data } = await this.props.client.query({
        query: this.props.query,
        variables: { ...this.props.variables }
      });
      this.setStateAsync({ data: data });
    } catch (e) {
      this.props.errorHandler.setError(e);
      this.setStateAsync({ error: e });
    } finally {
      this.setStateAsync({ processing: false });
    }
  };

  render() {
    const client = this.props.client;
    const error = this.state.error;
    const refetch = this.fetch;
    const data = this.state.data;
    const refreshInterval = this.props.refreshInterval;
    const backoff = this.props.backoff;
    const debug = this.props.debug;

    return (
      <TurbotBackoff interval={refreshInterval}>
        <TurbotQueryContainer
          client={client}
          data={data}
          loading={this.loading}
          error={error}
          refetch={refetch}
          backoff={backoff}
          debug={debug}
        >
          {this.props.children}
        </TurbotQueryContainer>
      </TurbotBackoff>
    );
  }
}

const enhance = compose(
  withTurbotErrorHandlerConsumer,
  withClient
);

export default enhance(TurbotQuery);
