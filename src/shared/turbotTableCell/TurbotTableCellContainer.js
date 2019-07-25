import React, { Component } from "react";
import PropTypes from "prop-types";
import TurbotTableCell from "./TurbotTableCell";
import TurbotIcon from "../turbotIcon/TurbotIcon";

const TypeSortBy = PropTypes.shape({
  asc: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
});

const propTypes = {
  sortBy: TypeSortBy,
  title: PropTypes.string,
  onSort: PropTypes.func,
  filters: PropTypes.string
};

/**
 * @example sortBy: {asc: 'sort:create_timestamp', desc: 'sort:-create_timestamp'}
 */

class TurbotTableCellContainer extends Component {
  static SORT_OPTIONS = {
    ASC: "asc",
    DESC: "desc"
  };

  state = {
    sortBy: null
  };

  get isActive() {
    return (
      0 <= this.props.filters.indexOf(this.props.sortBy[this.state.sortBy])
    );
  }

  componentDidMount() {
    if (this.props.sortBy) {
      this.setState({
        sortBy: TurbotTableCellContainer.SORT_OPTIONS.DESC
      });
    }
  }

  handleSort = () => {
    const sortBy =
      this.state.sortBy === TurbotTableCellContainer.SORT_OPTIONS.DESC
        ? TurbotTableCellContainer.SORT_OPTIONS.ASC
        : TurbotTableCellContainer.SORT_OPTIONS.DESC;
    this.props.onSort(this.props.sortBy[sortBy]);
    this.setState({
      sortBy: sortBy
    });
  };

  renderIcon = () => {
    return this.state.sortBy === TurbotTableCellContainer.SORT_OPTIONS.DESC ? (
      <TurbotIcon icon={"caret-down"} />
    ) : (
      <TurbotIcon icon={"caret-up"} />
    );
  };

  renderWithSort = () => {
    const active = this.isActive;
    return (
      <TurbotTableCell active={active} onClick={this.handleSort}>
        {this.props.title}
        &nbsp;
        {active && this.renderIcon()}
      </TurbotTableCell>
    );
  };

  renderWithoutSort = () => {
    return <TurbotTableCell>{this.props.title}</TurbotTableCell>;
  };

  render() {
    return this.state.sortBy ? this.renderWithSort() : this.renderWithoutSort();
  }
}

TurbotTableCellContainer.propTypes = propTypes;

export default TurbotTableCellContainer;
