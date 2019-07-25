import { getUrlSearchParamsValue } from "./../../utils/urls";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

class TurbotQueryFilterConvertor extends React.Component {
  static propTypes = {
    // Should come from parent
    list: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired,
    data: PropTypes.any,
    next: PropTypes.any,
    setRef: PropTypes.any,
    // Component prop
    filterSearchKey: PropTypes.string.isRequired
  };

  handleOnLoad = (filters, reload = false) => {
    const filtersFromUrl = getUrlSearchParamsValue(
      this.props.location,
      this.props.filterSearchKey
    );

    // Lets check if we have filter inside url query
    if (!reload && filtersFromUrl) {
      // If it's object
      if (filters && typeof filters === "object") {
        if (filters.filter) {
          filters.filter.push(filtersFromUrl);
        } else filters.filter = [filtersFromUrl];
      }
      // If it's string
      else if (filters && typeof filters === "string") {
        // Lets merge url filter string with filter string
        filtersFromUrl.split(" ").forEach(item => {
          if (filters.indexOf(item) < 0) filters = `${filters} ${item}`;
        });
      }
      // If filters is undefined
      else {
        filters = filtersFromUrl;
      }
    }

    this.props.onLoad(filters, reload);
  };

  renderChildrenWithProps = (children, props) => {
    return React.isValidElement(children)
      ? React.cloneElement(children, { ...props })
      : children({ ...props });
  };

  render() {
    const { onLoad, children, ...rest } = this.props;

    return this.renderChildrenWithProps(children, {
      ...rest,
      onLoad: this.handleOnLoad
    });
  }
}

export default withRouter(TurbotQueryFilterConvertor);
