import TableRow from "@material-ui/core/TableRow";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TableRowClickable from "../../tableList/tableRowClickable/TableRowClickable";

class TurbotActivityRowContainer extends React.Component {
  static propTypes = {
    cmp: PropTypes.element,
    canExpand: PropTypes.bool
  };

  static defaultProps = {
    canExpand: true
  };

  state = {
    expanded: false
  };

  handleClick = () => {
    this.props.canExpand &&
      this.setState(prevState => ({
        expanded: !prevState.expanded
      }));
  };

  renderChildren = () => {
    return typeof this.props.children === "function"
      ? this.props.children({
          expanded: this.state.expanded ? true : undefined
        })
      : this.props.children;
  };

  render() {
    return (
      <Fragment>
        <TableRowClickable onClick={this.handleClick} hover>
          {this.renderChildren()}
        </TableRowClickable>
        {this.props.cmp && this.state.expanded && (
          <TableRow>{this.props.cmp}</TableRow>
        )}
      </Fragment>
    );
  }
}

export default TurbotActivityRowContainer;
