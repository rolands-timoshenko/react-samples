import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { UI_URLS } from "../../config/urls";
import ControlContainer from "../../pages/control/ControlContainer";
import DirectoryContainer from "../../pages/directory/DirectoryContainer";
import HelpContainer from "../../pages/help/HelpContainer";
import HomeContainer from "../../pages/home/HomeContainer";
import NotFound from "../../pages/notFound/NotFound";
import PolicyContainer from "../../pages/policy/PolicyContainer";
import Profile from "../../pages/profile/Profile";
import ResourceContainer from "../../pages/resource/ResourceContainer";
import ProtectedRouteContainer from "../../shared/protectedRoute/ProtectedRouteContainer";
import NavigationTabsLayout from "../navigationTabsLayout/NavigationTabsLayout";
import SmartFolderContainer from "../../pages/smartFolder/SmartFolderContainer";

const propTypes = {
  session: PropTypes.bool
};

const Main = ({ session = false }) => {
  return (
    <Switch>
      <ProtectedRouteContainer
        exact
        session={session}
        path={UI_URLS.HOME}
        component={HomeContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.OVERVIEW}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.ACTIVITY}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.CONTROLS}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={`${UI_URLS.CONTROL}/:id`}
        component={ControlContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={`${UI_URLS.SMART_FOLDER}`}
        component={SmartFolderContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.DIRECTORIES}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={`${UI_URLS.DIRECTORY}`}
        component={DirectoryContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.HELP}
        component={HelpContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.PERMISSIONS}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.POLICIES}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={`${UI_URLS.POLICY}/typeUri/:policyTypeUri/resource/:resourceId`}
        component={PolicyContainer}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.PROFILE}
        component={Profile}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.REPORTS}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.RESOURCES}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={UI_URLS.SMART_FOLDERS}
        component={NavigationTabsLayout}
      />
      <ProtectedRouteContainer
        session={session}
        path={`${UI_URLS.RESOURCE}/:id`}
        component={ResourceContainer}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

Main.propTypes = propTypes;

export default Main;
