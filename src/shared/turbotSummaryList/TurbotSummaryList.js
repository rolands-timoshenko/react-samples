import PropTypes from "prop-types";
import React from "react";
import ListFilterWithState from "../listFilter/ListFilterWithState";

const propTypes = {
  filterKey: PropTypes.string.isRequired,
  defaultFilter: PropTypes.string,
  onLoadMore: PropTypes.func.isRequired,
  filterCmp: PropTypes.element,
  listCmp: PropTypes.element
};

const TurbotSummaryList = ({
  filterKey,
  defaultFilter = null,
  onLoadMore,
  filterCmp = null,
  listCmp = null
}) => {
  return (
    <ListFilterWithState
      stateKey={"summary"}
      filterSearchKey={filterKey}
      loadList={onLoadMore}
      defaultFilter={defaultFilter}
    >
      {filterCmp && filterCmp}
      {listCmp && listCmp}
    </ListFilterWithState>
  );
};

TurbotSummaryList.propTypes = propTypes;

export default TurbotSummaryList;
