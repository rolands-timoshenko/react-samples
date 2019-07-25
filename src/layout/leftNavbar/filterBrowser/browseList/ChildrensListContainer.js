import React, { Component, Fragment } from "react";
import BrowseDivider from "../browseDivider/BrowseDivider";
import BrowseList from "./BrowseList";
import Events from "../../../../config/events";
import PropTypes from "prop-types";
import queries from "./queries";
import withBackoff from "../../../../hoc/withBackoff";
import withClient from "../../../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../../../../shared/turbotErrorHandler/withTurbotErrorHandlerConsumer";
import { compose } from "redux";
import { withBus } from "react-bus";

class ChildrensListContainer extends Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.string),
    // Eevent bus
    bus: PropTypes.object,
    // Process management
    processes: PropTypes.array.isRequired,
    setProcessing: PropTypes.func.isRequired,
    withResourceNavNodes: PropTypes.bool.isRequired
  };

  timeoutId = null;

  state = {
    processing: false,
    list: [],
    next: null
  };

  get list() {
    return this.state.list;
  }

  get processing() {
    return this.props.processes.length > 0;
  }

  handleLoadMore = async (reload = false, clearList = false) => {
    await this.loadChildrenById(this.props.itemId, reload, clearList);
  };

  get isResourceNavNodesMode() {
    return (
      this.props.type.value === "resource" && this.props.withResourceNavNodes
    );
  }

  loadChildrenById = async (itemId, reload, clearList = false) => {
    try {
      if (this.state.processing) return;

      this.timeoutId && clearTimeout(this.timeoutId);

      clearList && this.props.setProcessing(true);

      await this.setStateAsync({
        processing: true,
        ...(clearList && { list: [] })
      });

      reload = reload || !this.state.next;

      let filters = [];

      if (this.props.filters) filters = filters.concat(this.props.filters);

      if (itemId === "turbotArtificialRoot") filters.push(`is:root limit:25`);
      else
        filters.push(
          `level:children ${this.props.type.value}:${itemId} sort:title limit:25`
        );

      const { data } = await this.props.client.query({
        query: this.isResourceNavNodesMode
          ? queries[this.props.type.value].childrenNavNodes
          : queries[this.props.type.value].children,
        fetchPolicy: "no-cache",
        variables: {
          filter: filters,
          ...(!reload && this.state.next && { paging: this.state.next })
        }
      });

      const next = data.list.paging.next;
      const list =
        !reload && this.state.next
          ? [...this.state.list, ...data.list.items]
          : data.list.items;

      await this.setStateAsync({
        processing: false,
        list,
        next
      });

      clearList && this.props.setProcessing(false);

      if (this.props.interval && reload) {
        this.timeoutId = setTimeout(() => {
          this.loadChildrenById(itemId, true);
          this.props.genNextInterval();
        }, this.props.interval);
      }
    } catch (error) {
      this.props.errorHandler.setError(error);
      this.setState({
        processing: false
      });
      clearList && this.props.setProcessing(false);
    }
  };

  setStateAsync = async state => {
    return new Promise(resolve => {
      this.setState(
        {
          ...state
        },
        resolve
      );
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    this.props.bus &&
      this.props.bus.off(Events.RESOURCE_CREATED, () =>
        this.handleLoadMore(true)
      );
  }

  componentDidMount() {
    this.handleLoadMore();
    this.props.bus &&
      this.props.bus.on(Events.RESOURCE_CREATED, () =>
        this.handleLoadMore(true)
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.handleLoadMore(true, true);
    }
  }

  render() {
    const { onSelect } = this.props;
    return (
      this.state.list && (
        <Fragment>
          <BrowseDivider />
          <BrowseList
            processing={this.processing}
            withCategory={false}
            onLoadMore={this.handleLoadMore}
            withLoadMore={Boolean(this.state.next)}
            list={this.list}
            onSelect={onSelect}
            withIndent={true}
          />
        </Fragment>
      )
    );
  }
}

const enhance = compose(
  withBackoff,
  withClient,
  withBus(),
  withTurbotErrorHandlerConsumer
);

export default enhance(ChildrensListContainer);
