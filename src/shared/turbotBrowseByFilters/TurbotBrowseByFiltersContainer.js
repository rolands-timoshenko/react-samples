import React, { Component } from "react";
import TurbotBrowseByFilters from "./TurbotBrowseByFilters";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { removeScopeFilterFromUrl } from "../../utils/urls";
import { withRouter } from "react-router";

class TurbotBrowseByFiltersContainer extends Component {
  prepareData() {
    const filters = [];
    for (let filter of this.props.scopeFilterOrders) {
      if (
        this.props.browseBy &&
        this.props.browseBy.mode !== filter.type.value
      ) {
        filters.push({
          type: filter.type.value,
          item: this.props.scopeFilters[filter.type.value]
        });
      }
    }
    return filters;
  }

  handleRemoveClick = filterKey => {
    removeScopeFilterFromUrl(
      this.props.location,
      this.props.history,
      filterKey
    );
  };

  render() {
    return (
      <TurbotBrowseByFilters
        filters={this.prepareData()}
        onRemoveClick={this.handleRemoveClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    browseBy: state.filters.browseBy,
    scopeFilters: state.filters.scopeFilters,
    scopeFilterOrders: state.filters.scopeFilterOrders
  };
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
);

export default enhance(TurbotBrowseByFiltersContainer);
