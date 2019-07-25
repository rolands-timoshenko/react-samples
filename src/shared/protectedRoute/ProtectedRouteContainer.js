import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { ACTIONS } from "../../store/actions/Auth";
import ProtectedRoute from "./ProtectedRoute";

class ProtectedRouteContainer extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    session: PropTypes.bool.isRequired,
    setRedirectUrl: PropTypes.func
  };

  componentWillMount() {
    if (!this.props.session && this.props.setRedirectUrl) {
      let route = this.props.location.pathname;
      route +=
        this.props.location.search !== "" ? this.props.location.search : "";
      this.props.setRedirectUrl(route);
    }
  }
  render() {
    return <ProtectedRoute {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRedirectUrl: route =>
      dispatch({ type: ACTIONS.AUTH_SET_REDIRECT_ROUTE, payload: route })
  };
};

const enhance = compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(ProtectedRouteContainer);
