import React, { Fragment } from "react";
import TurbotNotificationSelector from "../turbotNotificationSelector/TurbotNotificationSelector";

// TODO: fill proptypes data
const propTypes = {};

const TurbotControlNotification = ({
  filters,
  tabs,
  selectedTab,
  validProcessId,
  selectedFilter,
  onSelectFilter,
  onSelectTab,
  children
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

TurbotControlNotification.propTypes = propTypes;

export default TurbotControlNotification;
