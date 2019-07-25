import React from "react";
import TurbotNotificationSelector from "../turbotNotificationSelector/TurbotNotificationSelector";

const propTypes = {};

const TurbotPolicyValueNotification = ({
  filters,
  tabs,
  validProcessId,
  selectedTab,
  selectedFilter,
  onSelectFilter,
  onSelectTab,
  children
}) => {
  return (
    <>
      <TurbotNotificationSelector
        tabs={tabs}
        selectedTab={selectedTab}
        validProcessId={validProcessId}
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={onSelectFilter}
        onSelectTab={onSelectTab}
      />
      {children}
    </>
  );
};

TurbotPolicyValueNotification.propTypes = propTypes;

export default TurbotPolicyValueNotification;
