import React, { Fragment } from "react";
import TurbotNotificationSelector from "../turbotNotificationSelector/TurbotNotificationSelector";

const propTypes = {};

const TurbotResourceNotification = ({
  children,
  filters,
  onSelectFilter,
  onSelectTab,
  selectedFilter,
  selectedTab,
  tabs,
  validProcessId
}) => {
  return (
    <Fragment>
      <TurbotNotificationSelector
        filters={filters}
        onSelectFilter={onSelectFilter}
        onSelectTab={onSelectTab}
        selectedFilter={selectedFilter}
        selectedTab={selectedTab}
        tabs={tabs}
        validProcessId={validProcessId}
      />
      {children}
    </Fragment>
  );
};

TurbotResourceNotification.propTypes = propTypes;

export default TurbotResourceNotification;
