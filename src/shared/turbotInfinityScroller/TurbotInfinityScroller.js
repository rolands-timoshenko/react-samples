import { PropTypes } from "prop-types";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

class TurbotInfinityScroller extends React.Component {
  static propTypes = {
    hasMore: PropTypes.bool,
    noPadding: PropTypes.bool
  };

  state = {
    hasMore: this.props.hasMore ? this.props.hasMore : false,
    noPadding: this.props.noPadding ? this.props.noPadding : false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      typeof nextProps.hasMore !== "undefined" &&
      nextProps.hasMore !== prevState.hasMore
    )
      return {
        hasMore: nextProps.hasMore
      };
    return null;
  }

  setHasMore = hasMore => {
    this.setState({
      hasMore: hasMore
    });
  };

  setLoadMore = loadMore => {
    this.loadMore = loadMore;
  };

  handleLoadMore = () => {
    this.state.hasMore && this.loadMore && this.loadMore();
  };

  componentDidUpdate() {
    const childrenHeight = this.refs.children.clientHeight;
    const parentHeight = this.refs.container.clientHeight;
    if (parentHeight - 1 >= childrenHeight && this.state.hasMore) {
      this.loadMore();
    }
  }

  render() {
    const { children } = this.props;

    const containerStyle = {
      height: "100%",
      overflow: "auto"
    };

    // Add gap from both side so scrollbar not overflow content
    if (!this.state.noPadding) {
      containerStyle.paddingLeft = "1rem";
      containerStyle.paddingRight = "1rem";
    }

    const childrenStyle = {};

    return (
      <div ref={"container"} style={containerStyle}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleLoadMore}
          hasMore={this.state.hasMore}
          useWindow={false}
          threshold={100}
        >
          <div ref={"children"} style={childrenStyle}>
            {children({
              setLoadMore: this.setLoadMore,
              setHasMore: this.setHasMore
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default TurbotInfinityScroller;
