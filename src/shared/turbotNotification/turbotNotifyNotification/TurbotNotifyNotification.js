import React, { Fragment } from "react";
import TurbotNotificationSelector from "../turbotNotificationSelector/TurbotNotificationSelector";

// TODO: fill proptypes data
const propTypes = {};

const TurbotNotifyNotification = ({
  filters,
  tabs,
  selectedTab,
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
        validProcessId={true}
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={onSelectFilter}
        onSelectTab={onSelectTab}
      />
      {children}
    </Fragment>
  );
};

TurbotNotifyNotification.propTypes = propTypes;

export default TurbotNotifyNotification;
