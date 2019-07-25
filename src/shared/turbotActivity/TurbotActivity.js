import PropTypes from "prop-types";
import React from "react";
import { compose } from "redux";
import ListFilterContainer from "../listFilter/ListFilterContainer";
import { TypeActivityViewType } from "./TurbotActivity.types";
import TurbotActivityFilter from "./turbotActivityFilter/TurbotActivityFilter";
import TurbotActivityList from "./turbotActivityList/TurbotActivityList";

const propTypes = {
  list: PropTypes.array.isRequired,
  viewType: TypeActivityViewType.isRequired,
  filterFormCmp: PropTypes.any,
  wrapperCmp: PropTypes.any,
  filterSearchKey: PropTypes.string,
  onLoadList: PropTypes.func,
  processing: PropTypes.bool,
  total: PropTypes.number,
  title: PropTypes.string,
  additionalDropdownOptions: PropTypes.array
};

const TurbotActivity = ({
  filterSearchKey,
  onLoadList,
  list,
  viewType,
  total,
  processing = false,
  showFilter = true,
  filterFormCmp,
  wrapperCmp,
  additionalDropdownOptions
}) => {
  const renderWithWrapper = cmp => React.cloneElement(wrapperCmp, {}, cmp);

  const renderList = () => {
    return (
      <ListFilterContainer
        filterSearchKey={filterSearchKey}
        loadList={onLoadList}
      >
        {filterFormCmp && React.createElement(filterFormCmp, {})}
        {wrapperCmp ? (
          renderWithWrapper(
            <>
              <TurbotActivityFilter
                additionalDropdownOptions={additionalDropdownOptions}
                total={total}
                processing={processing}
              />
              <TurbotActivityList viewType={viewType} list={list} />
            </>
          )
        ) : (
          <>
            <TurbotActivityFilter
              additionalDropdownOptions={additionalDropdownOptions}
              total={total}
              processing={processing}
            />
            <TurbotActivityList viewType={viewType} list={list} />
          </>
        )}
      </ListFilterContainer>
    );
  };

  return (
    <>
      {showFilter ? (
        renderList()
      ) : (
        <TurbotActivityList viewType={viewType} list={list} />
      )}
    </>
  );
};

TurbotActivity.propTypes = propTypes;

const enhance = compose();

export default enhance(TurbotActivity);
