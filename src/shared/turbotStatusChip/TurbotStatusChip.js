import PropTypes from "prop-types";
import React from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import TurbotTextChip from "../turbotTextChip/TurbotTextChip";

const TurbotStatuses = Object.freeze({
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  NEW: "New"
});

const propTypes = {
  status: PropTypes.oneOf([
    TurbotStatuses.ACTIVE,
    TurbotStatuses.INACTIVE,
    TurbotStatuses.NEW
  ])
};

const TurbotStatusChip = ({ status, theme }) => {
  let backgroundColor;
  switch (status) {
    case TurbotStatuses.ACTIVE:
      backgroundColor = theme.palette.green;
      break;
    case TurbotStatuses.INACTIVE:
      backgroundColor = theme.palette.grey["600"];
      break;
    case TurbotStatuses.NEW:
      backgroundColor = theme.palette.turbot.dark;
      break;
    default:
      backgroundColor = theme.palette.grey["600"];
  }
  return <TurbotTextChip text={status} style={{ backgroundColor }} />;
};

TurbotStatusChip.propTypes = propTypes;

export default withTheme()(TurbotStatusChip);
