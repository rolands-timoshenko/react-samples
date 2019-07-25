import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";
import withListQueryContext from "../tableList/hoc/withListQueryContext";
import { compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class TurbotInfinityScroll extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    next: PropTypes.bool,
    filterSearchKey: PropTypes.string,
    location: PropTypes.object.isRequired,
    processing: PropTypes.bool
  };

  static defaultProps = {
    next: false,
    processing: false
  };

  constructor(props) {
    super(props);
    window._loadMore = this.props.loadMore;
  }

  throttleOnLoad = throttle(() => {
    if (this.props.processing || !this.props.next) {
      return;
    }
    const params = new URLSearchParams(this.props.location.search);
    const searchQuery = this.props.filterSearchKey
      ? params.get(this.props.filterSearchKey)
      : null;
    this.props.onLoadMore(searchQuery ? searchQuery : null, false);
  }, 800);

  handleLoadMore = () => {
    !this.props.processing && this.props.next && this.throttleOnLoad();
  };

  render() {
    const { next, children } = this.props;
    return (
      <InfiniteScroll
        useWindow={false}
        pageStart={1}
        loadMore={this.handleLoadMore}
        initialLoad={true}
        hasMore={next}
        threshold={300}
        useCapture={false}
      >
        {children}
      </InfiniteScroll>
    );
  }
}

const enhance = compose(
  withListQueryContext,
  withRouter
);

export default enhance(TurbotInfinityScroll);
