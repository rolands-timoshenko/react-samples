import { BusName } from "./../../config/events";
import PropTypes from "prop-types";
import React, { Component, PureComponent } from "react";
import TurbotActivity from "./TurbotActivity";
import { TypeActivityViewType } from "./TurbotActivity.types";
import { withBus } from "react-bus";

class TurbotActivityContainer extends Component {
  static propTypes = {
    // If event name passed, component will listen for this event and reload list
    eventName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    filterFormCmp: PropTypes.any,
    wrapperCmp: PropTypes.any,
    additionalDropdownOptions: PropTypes.array,
    viewType: TypeActivityViewType.isRequired,
    filterSearchKey: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    list: PropTypes.array,
    // all api returned data including list
    data: PropTypes.any,
    onLoad: PropTypes.func,
    // Used for control infinity scroll as parent
    setHasMore: PropTypes.func,
    setLoadMore: PropTypes.func
  };

  static defaultProps = {
    list: []
  };

  getTotal() {
    return this.props.data &&
      this.props.data.metadata &&
      this.props.data.metadata.stats
      ? this.props.data.metadata.stats.total
      : 0;
  }

  get computedList() {
    return this.props.list.map(item => ({
      id: item.turbot.id,
      data: item,
      type: item.notificationType
    }));
  }

  handleLoadList = (filterString, reload = false) => {
    const filters = [];
    if (filterString && filterString !== "") filters.push(filterString);
    if (!filterString || !filterString.includes("limit:")) {
      filters.push("limit:50");
    }
    filters.push(this.props.filter);

    this.props.onLoad(
      {
        filter: filters
      },
      reload
    );
  };

  componentDidMount() {
    this.props.setLoadMore && this.props.setLoadMore(this.handleLoadList);
    const { bus, eventName } = this.props;
    if (Array.isArray(eventName)) {
      // FIXME: Do not use map, map should return. Use forEach for non returning iteration
      eventName.forEach(event => {
        bus.on(event, this.reloadList);
      });
    } else if (eventName) {
      bus.on(eventName, this.reloadList);
    }
  }

  componentWillUnmount() {
    const { bus, eventName } = this.props;
    if (Array.isArray(eventName)) {
      eventName.forEach(event => {
        bus.off(event, this.reloadList);
      });
    } else if (eventName) {
      bus.off(eventName, this.reloadList);
    }
  }

  reloadList = () => {
    this.handleLoadList("", true);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.processing !== prevProps.processing &&
      !this.props.processing &&
      this.props.setHasMore
    ) {
      const next = this.props.next && this.getTotal() > this.props.list.length;
      this.props.setHasMore(next);
    }

    if (prevProps.filter !== this.props.filter) {
      this.handleLoadList("", true);
    }
  }

  render() {
    return (
      <TurbotActivity
        wrapperCmp={this.props.wrapperCmp}
        filterFormCmp={this.props.filterFormCmp}
        additionalDropdownOptions={this.props.additionalDropdownOptions}
        total={this.getTotal()}
        filterSearchKey={this.props.filterSearchKey}
        onLoadList={this.handleLoadList}
        list={this.computedList}
        viewType={this.props.viewType}
      />
    );
  }
}

export default withBus()(TurbotActivityContainer);
