import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DialogClose from "./DialogClose";

class DialogCloseContainer extends Component {
  onCloseClick = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      this.props.history.length > 2 && (
        <DialogClose onClick={this.onCloseClick} />
      )
    );
  }
}

export default withRouter(DialogCloseContainer);
