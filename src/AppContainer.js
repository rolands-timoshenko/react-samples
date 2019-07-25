import React, { Component } from "react";
import App from "./App";
import { connect } from "react-redux";
import { loadDirectoriesAsync, refreshTokenAsync } from "./store/actions/Auth";
import {
  selectUserProfileProcessing,
  selectLoggedIn
} from "./store/selectors/User";
import { SESSION } from "./config/session";
import { withRouter } from "react-router-dom";

class AppContainer extends Component {
  title;
  unlisten;
  timeoutId;

  get isReady() {
    return !this.props.userProfileProcessing;
  }

  componentWillUnmount() {
    this.unlisten();
    clearTimeout(this.timeoutId);
  }

  componentDidMount() {
    this.title = document.title;
    this.props.loadDirectoriesAsync();
    this.unlisten = this.props.history.listen(() => {
      if (this.props.session) {
        this.timeoutId && clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.props.refreshTokenAsync();
        }, SESSION.REFRESH_TIMEOUT);
      }
    });
  }

  render() {
    const { session } = this.props;
    return (
      <App
        session={session}
        ready={Boolean(this.isReady)}
        redirectTo={this.props.redirectTo}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    redirectTo: state.auth.redirectAfterLogin,
    session: selectLoggedIn(state),
    userProfileProcessing: selectUserProfileProcessing(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDirectoriesAsync: () => dispatch(loadDirectoriesAsync()),
    refreshTokenAsync: () => dispatch(refreshTokenAsync())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContainer)
);
