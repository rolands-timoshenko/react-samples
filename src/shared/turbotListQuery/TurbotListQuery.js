import { isEqual } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import withClient from "../../hoc/withClient";
import { ListQueryContext } from "../../hoc/withScopeFilterListQuery";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import withTurbotErrorHandlerProvider from "../turbotErrorHandler/withTurbotErrorHandlerProvider";
import { TypeErrorHandler } from "./../turbotErrorHandler/TurbotErrorHandlerConsumer";

class TurbotListQuery extends React.Component {
  mainRef = null;

  timeoutId;

  static propTypes = {
    query: PropTypes.any.isRequired,
    dataFetchKey: PropTypes.string.isRequired,
    errorHandler: TypeErrorHandler.isRequired
  };

  queueOfHandleLoadMore = [];

  state = {
    response: null,
    list: [],
    next: null,
    processing: false,
    loading: false,
    variables: null,
    error: null
  };

  setRef = ref => {
    this.mainRef = ref;
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

  setStateAsync = async state => {
    return new Promise(resolve => {
      this.setState(prevState => ({ ...prevState, ...state }), resolve);
    });
  };

  scrollToTop = reload => {
    if (reload && this.mainRef) {
      this.mainRef.scrollTo(0, 0);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  handleLoadMore = async (
    variables = {},
    reload = false,
    scrollTop = true,
    backoff = false
  ) => {
    try {
      if (this.state.processing) {
        return;
      }

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        // Just to be sure
        this.timeoutId = null;
      }

      await this.setStateAsync({
        ...(!backoff && { loading: true }),
        processing: true,
        error: null,
        ...(!isEqual(variables, this.state.variables) &&
          reload && {
            list: [],
            next: null
          })
      });

      // If reload is false but next page not exist lets reload data
      reload = reload || !this.state.next;

      scrollTop && this.scrollToTop(reload);

      const { data, errors } = await this.props.client.query({
        errorPolicy: "all",
        query: this.props.query,
        variables: {
          ...variables,
          paging: !reload ? this.state.next : null
        }
      });

      // Can be null when getting errors
      let tempData = data[this.props.dataFetchKey]
        ? { ...data[this.props.dataFetchKey] }
        : null;

      // Temporary solution used for cut out all tempData item rows with error
      if (tempData && errors) {
        // Lets find all broken array indexes
        // Assume that error path is ['data', 'items', {row index}]
        // So lets grab only integers
        const brokenDataIndexes = errors
          .map(error => error.path)
          .reduce((accum, curr) => {
            return accum.concat(curr.filter(item => typeof item === "number"));
          }, []);
        const uniqueBrokenDataIndexes = [...new Set(brokenDataIndexes)];
        // Filter by broken indexes
        tempData.items =
          tempData.items &&
          tempData.items.filter(
            (val, index) => !uniqueBrokenDataIndexes.includes(index)
          );
      }

      // If tempData null, lets set common structure, to use it further down
      if (!tempData && errors) {
        tempData = {
          items: [],
          paging: {
            next: null
          }
        };
      }

      this.setState(
        prevState => {
          const list = reload
            ? [...tempData.items]
            : [...prevState.list, ...tempData.items];
          const response = tempData;
          const next = tempData.paging.next;
          return {
            response,
            list,
            next,
            variables: variables
          };
        },
        () => this.setStateAsync({ loading: false, processing: false })
      );
      if (this.props.interval && reload) {
        this.timeoutId = setTimeout(() => {
          this.handleLoadMore(variables, true, false, true);
          this.props.genNextInterval();
        }, this.props.interval);
      }
    } catch (e) {
      let errorText = "Error running query";
      this.setError(errorText);
      this.setStateAsync({ loading: false, processing: false });
    }
  };

  getContext = () => {
    return {
      error: this.state.error,
      processing: this.state.processing,
      loading: this.state.loading,
      next: Boolean(this.state.next),
      listCount: this.state.list.length
    };
  };

  render() {
    const { query, dataFetchKey, children, ...rest } = this.props;
    return (
      <ListQueryContext.Provider value={this.getContext()}>
        {React.cloneElement(children, {
          data: this.state.response,
          list: this.state.list,
          onLoad: this.handleLoadMore,
          setRef: this.setRef,
          next: this.state.next,
          processing: this.state.processing,
          ...rest
        })}
      </ListQueryContext.Provider>
    );
  }
}

const enhance = compose(
  // order is crucial
  // FIXME: most likely withRouter hoc can be removed as not used here.
  // Be aware though can be used inside wrapped children
  withRouter,
  withClient,
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotListQuery);
