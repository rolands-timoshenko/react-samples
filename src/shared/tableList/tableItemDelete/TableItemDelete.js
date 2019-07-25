import React from "react";
import styles from "../common/tableItemActionStyles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import withTheme from "@material-ui/core/styles/withTheme";

const TableItemDelete = ({ disabled = true, onClick, style, theme }) => {
  const disabledStyles = disabled
    ? {
        borderColor: theme.palette.divider,
        color: theme.palette.divider,
        cursor: "default"
      }
    : {};
  return (
    <span
      className={
        disabled
          ? "list-item-action-button-disabled"
          : "list-item-action-button-active"
      }
      onClick={disabled ? null : onClick}
      style={{ ...styles(theme), ...disabledStyles, ...style }}
    >
      <TurbotIcon icon={["far", "times"]} />
    </span>
  );
};

export default withTheme()(TableItemDelete);
