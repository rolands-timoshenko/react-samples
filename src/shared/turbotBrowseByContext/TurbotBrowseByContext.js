import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import TurbotBrowseByBreadcrumbsContainer from "../turbotBrowseByBreadcrumbs/TurbotBrowseByBreadcrumbsContainer";
import TurbotBrowseByFiltersContainer from "../turbotBrowseByFilters/TurbotBrowseByFiltersContainer";
import TurbotGetActiveResourceContainer from "../turbotGetActiveResource/TurbotGetActiveResourceContainer";
import TurbotLoginButtonManagerContainer from "../turbotLoginButtonManager/TurbotLoginButtonManagerContainer";
import TurbotBrowseByContextStyles from "./TurbotBrowseByContext.styles";

const TurbotBrowseByContext = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <div className={classes.breadcrumbsContainer}>
          <TurbotBrowseByBreadcrumbsContainer />
        </div>
        <TurbotGetActiveResourceContainer>
          {({ resource }) => (
            <TurbotLoginButtonManagerContainer resource={resource} />
          )}
        </TurbotGetActiveResourceContainer>
      </div>
      <TurbotBrowseByFiltersContainer />
    </div>
  );
};

export default withStyles(TurbotBrowseByContextStyles)(TurbotBrowseByContext);
