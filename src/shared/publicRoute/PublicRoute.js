import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { UI_URLS } from "../../config/urls";

const propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  session: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
};

const getRedirectRoute = (path, redirectTo) => {
  // If no redirect specified, redirect to home
  if (!redirectTo) {
    return UI_URLS.HOME;
  }
  // If we're on the login page and the redirect is to login, redirect to home
  if (path === UI_URLS.LOGIN && redirectTo === UI_URLS.LOGIN) {
    return UI_URLS.HOME;
  }
  return redirectTo;
};

const PublicRoute = ({
  component: Component,
  redirectTo,
  session,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return !session ? (
        <Component {...props} />
      ) : (
        <Redirect to={getRedirectRoute(props.match.path, redirectTo)} />
      );
    }}
  />
);

PublicRoute.propTypes = propTypes;

export default PublicRoute;
