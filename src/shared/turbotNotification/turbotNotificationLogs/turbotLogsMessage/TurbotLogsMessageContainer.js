import React, { Component } from "react";
import TurbotLogsMessage from "./TurbotLogsMessage";

class TurbotLogsMessageContainer extends Component {
  state = {
    dataOpen: false
  };

  handleToggleDataVisible = () => {
    this.setState({
      dataOpen: !this.state.dataOpen
    });
  };

  render() {
    return (
      <TurbotLogsMessage
        type={this.props.type}
        message={this.props.message}
        data={this.props.data}
        dataOpen={this.state.dataOpen}
        onToggleDataVisible={this.handleToggleDataVisible}
      />
    );
  }
}

export default TurbotLogsMessageContainer;
