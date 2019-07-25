import PropTypes from "prop-types";
import React, { Component } from "react";
import { ListQueryContext } from "../../../hoc/withScopeFilterListQuery";
import TurbotLoadMore from "../../turbotList/turbotLoadMore/TurbotLoadMore";

class TurbotNotificationLoadMoreContainer extends Component {
  static contextType = ListQueryContext;
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired
  };

  render() {
    const { next, processing } = this.context;
    return (
      next && (
        <TurbotLoadMore
          processing={processing}
          onLoadMore={this.props.onLoadMore}
        />
      )
    );
  }
}

export default TurbotNotificationLoadMoreContainer;
