import React, { Component } from "react";
import LeftNavbarContainer from "./LeftNavbarContainer";

export const LeftNavbarContext = React.createContext("LeftNavbar");

class LeftNavbarContextWrapper extends Component {
  state = {
    isVisible: false
  };

  setVisibility = isVisible => {
    this.setState({
      isVisible: isVisible
    });
  };

  getContext = () => {
    return {
      setVisibility: this.setVisibility
    };
  };

  render() {
    return (
      <LeftNavbarContext.Provider value={this.getContext()}>
        {/* Consider to make it hidden instead of remount */}
        {this.state.isVisible && <LeftNavbarContainer />}
        {this.props.children}
      </LeftNavbarContext.Provider>
    );
  }
}

export default LeftNavbarContextWrapper;
