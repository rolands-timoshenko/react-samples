import React from "react";
import TableItemDelete from "../tableItemDelete/TableItemDelete";
import TableItemEdit from "../tableItemEdit/TableItemEdit";
import TableItemActivate from "../tableItemActivate/TableItemActivate";

const TableItemActions = ({
  withActivate = false,
  withEdit = false,
  withDelete = false,
  deleteDisabled = true,
  activateDisabled = true,
  item,
  onActivateClick,
  onEditClick,
  onDeleteClick
}) => {
  const actions = [];

  if (withActivate) {
    actions.push(
      <TableItemActivate
        key="activate"
        status={item.status}
        disabled={activateDisabled}
        onClick={onActivateClick}
      />
    );
  }

  if (withEdit) {
    actions.push(
      <TableItemEdit
        key="edit"
        onClick={onEditClick}
        style={{ marginLeft: withActivate ? "0.5em" : 0 }}
      />
    );
  }

  if (withDelete) {
    actions.push(
      <TableItemDelete
        key="delete"
        onClick={onDeleteClick}
        disabled={deleteDisabled}
        style={{ marginLeft: withActivate || withEdit ? "0.5em" : 0 }}
      />
    );
  }

  return actions;
};

export default TableItemActions;
