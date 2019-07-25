import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BrowseResourceMenuStyles from "./BrowseResourceMenu.styles";
import { withStyles } from "@material-ui/core/styles";
import TurbotMenu from "../../../shared/turbotMenu/TurbotMenu";
import TurbotMenuItem from "../../../shared/turbotMenuItem/TurbotMenuItem";

const BrowseResourceMenu = ({
  classes,
  options,
  open,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onMenuItemClick
}) => (
  <Fragment>
    <IconButton
      className={classes.root}
      aria-label="More"
      aria-owns={open ? "long-menu" : undefined}
      aria-haspopup="true"
      onClick={onMenuClick}
    >
      <MoreVertIcon className={classes.root} />
    </IconButton>
    <TurbotMenu
      id="long-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onMenuClose}
      // PaperProps={{
      //   style: {
      //     maxHeight: ITEM_HEIGHT * 4.5,
      //       width: 200,
      //   },
      // }}
    >
      {options.map(option => (
        <TurbotMenuItem
          key={option.id}
          classes={{ root: classes.menuItem }}
          onClick={() => onMenuItemClick(option)}
        >
          {option.label}
        </TurbotMenuItem>
      ))}
    </TurbotMenu>
  </Fragment>
);

export default withStyles(BrowseResourceMenuStyles)(BrowseResourceMenu);
