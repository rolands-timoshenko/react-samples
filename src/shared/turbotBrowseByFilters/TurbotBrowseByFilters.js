import React from "react";
import TurbotBrowseByFilter from "./turbotBrowseByFilter/TurbotBrowseByFilter";
import TurbotBrowseByFiltersStyles from "./TurbotBrowseByFilters.styles";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import withStyles from "@material-ui/core/styles/withStyles";

const TurbotBrowseByFilters = ({ classes, filters, onRemoveClick }) => {
  if (filters.length === 0) {
    return null;
  }
  return (
    <div className={classes.root}>
      <span className={classes.iconWrapper}>
        <TurbotIcon className={classes.turbotIcon} icon={["fal", "filter"]} />
      </span>
      {filters.map(filter => (
        <TurbotBrowseByFilter
          key={filter.type}
          filter={filter}
          onRemoveClick={onRemoveClick}
        />
      ))}
    </div>
  );
};

export default withStyles(TurbotBrowseByFiltersStyles)(TurbotBrowseByFilters);
