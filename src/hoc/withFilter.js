import React, { PureComponent } from "react";
import { getQueryStringAsObject } from "../utils/urls";
// TODO: check if this hoc used somewhere else, most likely we can remove it
const withFilter = WrappedComponent => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      const queryString = getQueryStringAsObject(props.location);
      this.state = {
        filter: queryString.filter ? queryString.filter : null
      };
    }

    getFilter() {
      if (!this.state.filter) {
        return "";
      }
      const filterParts = this.state.filter.split(" ");
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

    componentDidMount() {
      this.unlisten = this.props.history.listen(location => {
        const queryString = getQueryStringAsObject(location);
        const filter = queryString.filter;
        this.setState({
          filter
        });
      });
      const queryString = getQueryStringAsObject(this.props.location);
      const filter = queryString.filter;
      this.setState({
        filter
      });
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      return (
        <WrappedComponent {...this.props} scopeFilter={this.getFilter()} />
      );
    }
  };
};

export default withFilter;
