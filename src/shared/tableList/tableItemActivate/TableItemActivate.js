import React from "react";
import styles from "../common/tableItemActionStyles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import withTheme from "@material-ui/core/styles/withTheme";

const TableItemActivate = ({ disabled = true, onClick, status, theme }) => {
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
      style={{ ...styles(theme), ...disabledStyles }}
    >
      <TurbotIcon
        icon={["far", status === "Active" ? "level-down" : "level-up"]}
      />
      {status !== "Active" && " Activate"}
    </span>
  );
};

export default withTheme()(TableItemActivate);

//className="list-item-action-button"
