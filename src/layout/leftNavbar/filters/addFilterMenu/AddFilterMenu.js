import React, { useState } from "react";
import AddFilterMenuStyles from "./AddFilterMenu.styles";
import { withStyles } from "@material-ui/core";
import TurbotMenu from "../../../../shared/turbotMenu/TurbotMenu";
import TurbotMenuItem from "../../../../shared/turbotMenuItem/TurbotMenuItem";
import TurbotIcon from "../../../../shared/turbotIcon/TurbotIcon";
import TurbotSelectContainer from "../../../../shared/turbotSelect/TurbotSelectContainer";

const AddFilterMenu = ({
  anchorEl,
  classes,
  filterChoices,
  onAddfilter,
  onRemoveFilter,
  onClose
}) => {
  let options = filterChoices.map(option => {
    return {
      config: option.config,
      enabled: option.enabled
    };
  });

  // Sort options according to the selected status
  // If more than one element is selected then sort the options array
  const selected = options.filter(option => !option.enabled);
  if (selected.length > 1) {
    options.sort((a, b) => (!a.enabled && b.enabled ? -1 : 1));
  }

  const handleOnClick = filter => {
    if (filter.enabled) {
      onAddfilter(filter.config);
    } else {
      onRemoveFilter(filter.config.value);
    }
  };

  return (
    <TurbotMenu
      id="add-filter-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {options.map(filter => (
        <TurbotMenuItem
          classes={{ root: classes.menuItem }}
          key={filter.config.value.value}
          selected={!filter.enabled}
          onClick={() => handleOnClick(filter)}
        >
          <div className={classes.menuItemIcon}>
            {!filter.enabled && (
              <TurbotIcon fixedWidth={true} icon="check" size="small" />
            )}
          </div>
          <div className={classes.menuItemLabel}>{filter.config.label}</div>
        </TurbotMenuItem>
      ))}
    </TurbotMenu>
  );
};

export default withStyles(AddFilterMenuStyles)(AddFilterMenu);
