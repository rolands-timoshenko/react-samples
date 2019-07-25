import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";

const propTypes = {
  content: PropTypes.element,
  actions: PropTypes.node
};

const TableItem = ({ content }) => {
  return <TableRow>{content}</TableRow>;
};

TableItem.propTypes = propTypes;

export default TableItem;
