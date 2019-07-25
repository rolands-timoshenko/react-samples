import { withRouter } from "react-router-dom";
import throttle from "lodash/throttle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import TableListWrapper from "../tableListWrapper/TableListWrapper";
import withListQueryContext from "./withListQueryContext";
import { compose } from "react-apollo";

const withInfinityScroll = ListComponent => {
  class InfinityScrollList extends Component {
    static propTypes = {
      onLoadMore: PropTypes.func.isRequired,
      next: PropTypes.bool,
      filterSearchKey: PropTypes.string.isRequired,
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
      const searchQuery = params.get(this.props.filterSearchKey);
      // console.info("loadMOre");
      this.props.onLoadMore(searchQuery ? searchQuery : null, false);
    }, 400);

    handleLoadMore = () => {
      !this.props.processing && this.props.next && this.throttleOnLoad();
    };

    _render() {
      const { next, children, ...rest } = this.props;
      return (
        <InfiniteScroll
          useWindow={false}
          pageStart={1}
          loadMore={this.handleLoadMore}
          initialLoad={true}
          hasMore={next}
          // threshold={100}
          useCapture={true}
        >
          <ListComponent {...rest}>
            {/* TODO: move out TableListWrapper */}
            <TableListWrapper>{children}</TableListWrapper>
          </ListComponent>
        </InfiniteScroll>
      );
    }
    render() {
      const { next, children, ...rest } = this.props;
      return (
        <div>
          <ListComponent {...rest}>
            {/* TODO: move out TableListWrapper */}
            <TableListWrapper>{children}</TableListWrapper>
          </ListComponent>
        </div>
      );
    }
  }

  const enhance = compose(
    withListQueryContext,
    withRouter
  );

  return enhance(InfinityScrollList);
};

export default withInfinityScroll;
