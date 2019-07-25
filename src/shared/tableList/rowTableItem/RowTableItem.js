import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import RowTableItemStyles from "./RowTableItem.styles";
import { withStyles } from "@material-ui/core";

const propTypes = {
  item: PropTypes.object.isRequired,
  keys: PropTypes.array.isRequired,
  actions: PropTypes.node,
  onClick: PropTypes.func,
  cellSizes: PropTypes.arrayOf(PropTypes.string),
  cellStyle: PropTypes.object
};

const RowTableItem = ({
  classes,
  item,
  actions,
  keys,
  onClick,
  cellSizes,
  cellStyle,
  bottomBorder = true,
  hover = true
}) => {
  function getValueByKeyPath(obj, path) {
    let arr = path.split(".");
    do {
      obj = obj[arr.shift()];
    } while (arr.length > 0);
    return obj;
  }

  const cellDefaultStyles = {
    padding: "10px 20px"
  };

  const getCellStyle = index => {
    return {
      ...cellDefaultStyles,
      ...(cellStyle && cellStyle),
      ...(cellSizes && cellSizes[index] && { width: cellSizes[index] })
    };
  };

  const rowClasses = {
    root: classes.row__root,
    hover: classes.row__hover
  };
  if (!bottomBorder) rowClasses.root = classes.row__noBottomBorder;

  return (
    <TableRow hover={hover} classes={rowClasses} onClick={onClick}>
      {keys.map((key, index) => {
        if (typeof key === "function")
          return (
            <TableCell style={getCellStyle(index)} key={key}>
              {key(item)}
            </TableCell>
          );
        else
          return (
            <TableCell style={getCellStyle(index)} key={key}>
              {getValueByKeyPath(item, key)}
            </TableCell>
          );
      })}
      {actions ? (
        <TableCell style={getCellStyle(keys.length)} numeric>
          {actions}
        </TableCell>
      ) : null}
    </TableRow>
  );
};

RowTableItem.propTypes = propTypes;

export default withStyles(RowTableItemStyles)(RowTableItem);
