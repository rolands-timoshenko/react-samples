import React, { Fragment } from "react";
import TurbotResourceBreadcrumbContainer from "../turbotResourceBreadcrumb/TurbotResourceBreadcrumbContainer";
import TurbotResourceFavouriteToggleContainer from "../turbotResourceFavouriteToggle/TurbotResourceFavouriteToggleContainer";

const TurbotBrowseByBreadcrumbs = ({
  browseBy,
  checkHasPermissionForResource,
  onBreadcrumbClick,
  scopeFilters
}) => {
  if (!browseBy || !scopeFilters[browseBy.mode]) {
    return null;
  }

  const isResourceBrowseByMode = browseBy.mode === "resource";

  const styles = isResourceBrowseByMode ? { marginRight: "1.2em" } : {};

  return (
    <Fragment>
      <TurbotResourceBreadcrumbContainer
        checkHasPermission={checkHasPermissionForResource}
        onBreadcrumbClick={onBreadcrumbClick}
        resource={scopeFilters[browseBy.mode]}
        style={{ ...styles, marginLeft: 13 }}
      />
      {/* 
        // TODO: #1075 enable when api supports favourite functionality
        {isResourceBrowseByMode && (
        <TurbotResourceFavouriteToggleContainer
          resource={scopeFilters[browseBy.mode]}
        />
      )} */}
    </Fragment>
  );
};

export default TurbotBrowseByBreadcrumbs;
