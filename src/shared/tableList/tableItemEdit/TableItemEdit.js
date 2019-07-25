import React from "react";
import styles from "../common/tableItemActionStyles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import withTheme from "@material-ui/core/styles/withTheme";

const TableItemEdit = ({ onClick, style, theme }) => {
  return (
    <span
      className="list-item-action-button"
      onClick={onClick}
      style={{ ...styles(theme), ...style }}
    >
      <TurbotIcon icon={["far", "pencil"]} />
    </span>
  );
};

export default withTheme()(TableItemEdit);
