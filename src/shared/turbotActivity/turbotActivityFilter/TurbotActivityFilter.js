import PropTypes from "prop-types";
import { FILTER_DROPDOWNS_ACTIONS } from "./../../listFilter/filterPanel/filterDropdowns/FilterDropdowns";
import React, { Fragment } from "react";
import FilterPanel from "../../listFilter/filterPanel/FilterPanel";
import FilterDropdowns from "../../listFilter/filterPanel/filterDropdowns/FilterDropdowns";
import TurbotFilterTotal from "../../turbotListFilters/turbotFilterTotal/TurbotFilterTotal";

const dropdownOptions = [
  {
    label: "Period",
    showSelectedInLabel: true,
    options: [
      {
        label: "1 hour",
        value: "timestamp:>T-1h",
        action: FILTER_DROPDOWNS_ACTIONS.ADD,
        replace: true
      },
      {
        label: "1 day",
        value: "timestamp:>T-1d",
        action: FILTER_DROPDOWNS_ACTIONS.ADD,
        replace: true
      },
      {
        label: "7 days",
        value: "timestamp:>T-7d",
        action: FILTER_DROPDOWNS_ACTIONS.ADD,
        replace: true
      },
      {
        label: "14 days",
        value: "timestamp:>T-14d",
        action: FILTER_DROPDOWNS_ACTIONS.ADD,
        replace: true
      },
      {
        label: "30 days",
        value: "timestamp:>T-30d",
        action: FILTER_DROPDOWNS_ACTIONS.ADD,
        replace: true
      }
    ]
  },
  {
    label: "Sort",
    showSelectedInLabel: true,
    options: [
      {
        label: "Timestamp",
        value: "sort:-timestamp",
        action: FILTER_DROPDOWNS_ACTIONS.ADD
      }
    ]
  }
];

const propTypes = {
  total: PropTypes.number.isRequired,
  processing: PropTypes.bool,
  // Dropdown options to extend default
  additionalDropdownOptions: PropTypes.array
};

const TurbotActivityFilter = ({
  additionalDropdownOptions = [],
  total,
  processing = false
}) => {
  return (
    <Fragment>
      <FilterPanel>
        <TurbotFilterTotal
          isLoading={processing}
          label={"Notification"}
          value={total}
          icon={["fal", "server"]}
        />
        <FilterDropdowns
          grid={"auto"}
          style={{ marginLeft: "auto" }}
          options={[...additionalDropdownOptions, ...dropdownOptions]}
        />
      </FilterPanel>
    </Fragment>
  );
};

TurbotActivityFilter.propTypes = propTypes;

export default TurbotActivityFilter;
