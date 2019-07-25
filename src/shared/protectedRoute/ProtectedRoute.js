import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UI_URLS } from "../../config/urls";
import PropTypes from "prop-types";

const propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  session: PropTypes.bool.isRequired,
  redirectAfterLogin: PropTypes.func
};

const ProtectedRoute = ({
  component: Component,
  session,
  setRedirectUrl,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        session ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: UI_URLS.LOGIN
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = propTypes;

export default ProtectedRoute;
