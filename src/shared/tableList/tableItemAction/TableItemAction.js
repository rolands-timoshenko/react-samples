import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TurbotIconButton from "../../turbotIconButton/TurbotIconButton";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TableItemActionStyles from "./TableItemAction.styles";

const propTypes = {
  actions: PropTypes.array,
  anchorEl: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

const TableItemAction = ({
  classes,
  actions,
  anchorEl,
  onClick,
  onClose,
  onSelect
}) => {
  const TurbotIconButtonClasses = {
    root: classes.turbotIconButton__root
  };

  const TurbotIconClasses = {
    root: classes.turbotIcon_root
  };

  const handleSelect = action => {
    return evt => onSelect(evt, action);
  };

  return (
    <Fragment>
      <TurbotIconButton onClick={onClick} classes={TurbotIconButtonClasses}>
        <TurbotIcon classes={TurbotIconClasses} icon={["far", "ellipsis-v"]} />
      </TurbotIconButton>
      {actions && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
          {actions.map(action => (
            <MenuItem key={action.value} onClick={handleSelect(action)}>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Fragment>
  );
};

TableItemAction.propTypes = propTypes;

export default withStyles(TableItemActionStyles)(TableItemAction);
