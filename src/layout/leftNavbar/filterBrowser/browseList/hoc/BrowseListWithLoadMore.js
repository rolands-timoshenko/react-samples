import throttle from "lodash/throttle";
import PropTypes from "prop-types";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import TurbotLoader from "../../../../../shared/turbotLoader/TurbotLoader";

class BrowseListWithLoadMore extends React.Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    processing: PropTypes.bool
  };

  static defaultProps = {
    hasMore: false,
    processing: false
  };

  throttleOnLoad = throttle(async () => {
    await this.props.onLoadMore();
  }, 300);

  handleLoadMore = async () => {
    !this.props.processing && this.props.hasMore && this.throttleOnLoad();
  };

  renderLoader = () => {
    const styles = {
      textAlign: "center"
    };
    return (
      this.props.processing && (
        <div key={"infinity-scroll-loader"} style={styles}>
          <TurbotLoader />
        </div>
      )
    );
  };

  render() {
    const { hasMore, children } = this.props;
    return (
      <InfiniteScroll
        useWindow={false}
        loader={this.renderLoader()}
        pageStart={0}
        loadMore={this.handleLoadMore}
        initialLoad={false}
        hasMore={hasMore}
        threshold={10}
      >
        {children}
      </InfiniteScroll>
    );
  }
}

export default BrowseListWithLoadMore;
