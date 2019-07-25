import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { TypeOption } from "../../turbotButtonSelect/TurbotButtonSelect";
import TurbotSelectContainer from "../../turbotSelect/TurbotSelectContainer";
import TurbotTabsSelector from "../../turbotTabsSelector/TurbotTabsSelector";

const TypeSelectorTabs = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
});

const propTypes = {
  tabs: PropTypes.arrayOf(TypeSelectorTabs).isRequired,
  selectedTab: TypeSelectorTabs,
  validProcessId: PropTypes.bool,
  filters: PropTypes.arrayOf(TypeOption),
  selectedFilter: TypeOption,
  onSelectFilter: PropTypes.func,
  onSelectTab: PropTypes.func
};

const TurbotNotificationSelector = ({
  tabs,
  selectedTab,
  validProcessId,
  filters,
  selectedFilter,
  onSelectFilter,
  onSelectTab
}) => {
  const rootStyle = {
    maxHeight: 27
  };
  const actions = (
    <>
      {filters && selectedTab.label === "Log" && validProcessId && (
        <TurbotSelectContainer
          onSelect={onSelectFilter}
          label={selectedFilter.label}
          options={filters}
          selected={[selectedFilter]}
          selectedInLabel={false}
        />
      )}
    </>
  );
  return (
    <>
      <TurbotTabsSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={onSelectTab}
        tabSize="xs"
        rootStyle={rootStyle}
        actions={actions}
      />
    </>
  );
};

TurbotNotificationSelector.propTypes = propTypes;

export default TurbotNotificationSelector;
