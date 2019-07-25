import React from "react";
import { Route, Switch } from "react-router-dom";
import { UI_URLS } from "../../config/urls";
import HeaderContent from "../../layout/headerContent/HeaderContent";
import NavigationTabsContainer from "../../layout/navigationTabs/NavigationTabsContainer";
import PageContainer from "../../layout/pageContainer/PageContainer";
import SiteContainer from "../../layout/siteContainer/SiteContainer";
import ActivityContainer from "../../pages/activity/ActivityContainer";
import ControlsContainer from "../../pages/controls/ControlsContainer";
import DirectoriesContainer from "../../pages/directories/DirectoriesContainer";
import OverviewContainer from "../../pages/overview/OverviewContainer";
import PermissionsContainer from "../../pages/permissions/PermissionsContainer";
import PoliciesContainer from "../../pages/policies/PoliciesContainer";
import Reports from "../../pages/reports/Reports";
import ResourcesContainer from "../../pages/resources/ResourcesContainer";
import TurbotBrowseByContext from "../../shared/turbotBrowseByContext/TurbotBrowseByContext";
import SmartFoldersContainer from "../../pages/smartFolders/SmartFoldersContainer";

const NavigationTabsLayout = () => (
  <SiteContainer>
    <PageContainer>
      <HeaderContent>
        <TurbotBrowseByContext />
        <NavigationTabsContainer />
      </HeaderContent>
      <Switch>
        <Route path={UI_URLS.OVERVIEW} component={OverviewContainer} />
        <Route path={UI_URLS.ACTIVITY} component={ActivityContainer} />
        <Route path={UI_URLS.CONTROLS} component={ControlsContainer} />
        <Route path={UI_URLS.DIRECTORIES} component={DirectoriesContainer} />
        <Route path={UI_URLS.PERMISSIONS} component={PermissionsContainer} />
        <Route path={UI_URLS.POLICIES} component={PoliciesContainer} />
        <Route path={UI_URLS.REPORTS} component={Reports} />
        <Route path={UI_URLS.RESOURCES} component={ResourcesContainer} />
        <Route path={UI_URLS.SMART_FOLDERS} component={SmartFoldersContainer} />
      </Switch>
    </PageContainer>
  </SiteContainer>
);

export default NavigationTabsLayout;
