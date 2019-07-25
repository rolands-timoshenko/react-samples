import React, { Component } from "react";
import { UI_URLS } from "../../config/urls";
import { withRouter } from "react-router-dom";
import SmartFoldersNavigationButton from "./SmartFoldersNavigationButton";

class SmartFoldersNavigationButtonContainer extends Component {
  state = {
    dialogOpen: false
  };

  handleClick = async () => {
    this.props.history.push(
      `${UI_URLS.SMART_FOLDERS}${this.props.location.search}`
    );
  };

  render() {
    return (
      <SmartFoldersNavigationButton
        dialogOpen={this.state.dialogOpen}
        onClick={this.handleClick}
      />
    );
  }
}

export default withRouter(SmartFoldersNavigationButtonContainer);
