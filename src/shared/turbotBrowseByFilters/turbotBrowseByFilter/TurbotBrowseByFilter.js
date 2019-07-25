import React from "react";
import TurbotBrowseByFilterStyles from "./TurbotBrowseByFilter.styles";
import withStyles from "@material-ui/core/styles/withStyles";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import { getBreadcrumbString } from "../../../utils/resources";

const typeAbbreviation = type => {
  switch (type) {
    case "controlCategory":
      return "CC";
    case "controlType":
      return "CT";
    case "policyType":
      return "PT";
    case "resource":
      return "R";
    case "resourceCategory":
      return "RC";
    case "resourceType":
      return "RT";
    default:
      return "?";
  }
};

const itemBreadcrumb = item => {
  if (!item) {
    return "";
  }

  return getBreadcrumbString(item.trunk);
};

const TurbotBrowseByFilter = ({ classes, filter, onRemoveClick }) => {
  const abbreviation = typeAbbreviation(filter.type);
  const breadcrumb = itemBreadcrumb(filter.item);

  return (
    <div className={classes.box}>
      <span className={classes.text}>
        {abbreviation}: {breadcrumb}
      </span>
      <TurbotIcon
        className={classes.removeIcon}
        icon={["fal", "times"]}
        fixedWidth={false}
        onClick={() => onRemoveClick(filter.type)}
      />
    </div>
  );
};

export default withStyles(TurbotBrowseByFilterStyles)(TurbotBrowseByFilter);
