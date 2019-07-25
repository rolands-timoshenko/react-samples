import { withScopeFilterStateManagement } from "./../../hoc/withScopeFilterStateManagement";
import { selectDisplayName } from "./../../store/selectors/User";
import React, { Component } from "react";
import LeftNavbar from "./LeftNavbar";
import { connect } from "react-redux";
import { logoutAsync } from "../../store/actions/Auth";
import { withRouter } from "react-router-dom";

class LeftNavbarContainer extends Component {
  unlisten;
  state = {
    currentPath: null
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(location => {
      this.setState({
        currentPath: location.pathname
      });
    });
    this.setState({
      currentPath: this.props.history.location.pathname
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleItemClick = route => {
    this.props.history.push(route);
  };

  render() {
    const { profile } = this.props;
    return (
      <LeftNavbar
        selected={this.state.currentPath}
        profile={profile}
        onItemClick={this.handleItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: selectDisplayName(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAsync())
  };
};

export default withScopeFilterStateManagement(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LeftNavbarContainer)
  )
);
