import React, { Fragment } from "react";
import AppStyles from "./App.styles";
import LeftNavbarContextWrapper from "./layout/leftNavbar/LeftNavbarContextWrapper";
import Login from "./pages/login/Login";
import Main from "./layout/main/Main";
import PermissionsMetadataRefresherContainer from "./shared/permissionRefresher/PermissionsMetadataRefresherContainer";
import PropTypes from "prop-types";
import PublicRoute from "./shared/publicRoute/PublicRoute";
import TurbotLoader from "./shared/turbotLoader/TurbotLoader";
import UserPermissionsRefresherContainer from "./shared/permissionRefresher/UserPermissionsRefresherContainer";
import { Route, Switch } from "react-router";
import { UI_URLS } from "./config/urls";
import { withStyles } from "@material-ui/core/styles";
import TurbotErrorHandlerProvider from "./shared/turbotErrorHandler/TurbotErrorHandlerProvider";

const propTypes = {
  session: PropTypes.bool,
  ready: PropTypes.bool,
  redirectTo: PropTypes.string
};

const App = ({ classes, redirectTo, session = false, ready = false }) => {
  const LoginWrapper = () => (
    <div className={classes.root}>
      <Login />
    </div>
  );
  return (
    <Fragment>
      <TurbotErrorHandlerProvider errorView={null}>
        <PermissionsMetadataRefresherContainer />
      </TurbotErrorHandlerProvider>
      <TurbotErrorHandlerProvider errorView={null}>
        <UserPermissionsRefresherContainer />
      </TurbotErrorHandlerProvider>
      <Switch>
        <PublicRoute
          redirectTo={redirectTo}
          session={session}
          path={UI_URLS.LOGIN}
          component={LoginWrapper}
        />
        <Route
          render={() => {
            return !ready ? (
              <div className="App-loader">
                <TurbotLoader />
              </div>
            ) : (
              <div className={classes.root}>
                <LeftNavbarContextWrapper>
                  <Main session={session} redirectTo={redirectTo} />
                </LeftNavbarContextWrapper>
              </div>
            );
          }}
        />
      </Switch>
    </Fragment>
  );
};

App.propTypes = propTypes;

export default withStyles(AppStyles)(App);
