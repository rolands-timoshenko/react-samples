import React, { Component } from "react";
import BrowseSelected from "./BrowseSelected";
import PropTypes from "prop-types";
import { getUrlSearchParamsValue } from "../../../../utils/urls";
import { TBrowseItem } from "../browseList/browseItem/BrowseItem";
import { withRouter } from "react-router-dom";

class BrowseSelectedContainer extends Component {
  static propTypes = {
    item: TBrowseItem.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool
  };

  static defaultProps = {
    isSelected: null
  };

  get isSelected() {
    if (typeof this.props.isSelected === "boolean")
      return this.props.isSelected;

    const filter = getUrlSearchParamsValue(this.props.location, "filter");
    return (
      this.props.item &&
      filter &&
      filter.indexOf(`${this.props.type.value}:${this.props.item.turbot.id}`) >=
        0
    );
  }

  render() {
    const { action, item, onSelect } = this.props;
    return (
      <BrowseSelected
        isSelected={this.isSelected}
        selected={item}
        action={action}
        onClick={onSelect}
      />
    );
  }
}

export default withRouter(BrowseSelectedContainer);
