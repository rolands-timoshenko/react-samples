import React, { Component } from "react";
import { getQueryStringAsObject } from "../utils/urls";

const withFilters = localFilterKey => WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        localFilter: null,
        scopeFilter: null
      };
    }

    getScopeFilter() {
      if (!this.state.scopeFilter) {
        return "";
      }
      const filterParts = this.state.scopeFilter.split(" ");
      const parsedFilterParts = [];
      for (let filterPart of filterParts) {
        const parts = filterPart.split(":");
        if (parts[1] === "turbotArtificialRoot") {
          continue;
        }
        parsedFilterParts.push(filterPart);
      }

      return `${parsedFilterParts.join(" ")}`;
    }

    storeFiltersInState(location) {
      const queryString = getQueryStringAsObject(location);
      const scopeFilter = queryString.filter;
      const localFilter = queryString[localFilterKey];
      this.setState({
        localFilter,
        scopeFilter
      });
    }

    componentDidMount() {
      this.unlisten = this.props.history.listen(location => {
        this.storeFiltersInState(location);
      });
      this.storeFiltersInState(this.props.location);
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          localFilter={this.state.localFilter}
          scopeFilter={this.getScopeFilter()}
        />
      );
    }
  };
};

export default withFilters;
