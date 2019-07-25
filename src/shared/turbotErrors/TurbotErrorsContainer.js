import React, { Component } from "react";
import TurbotErrors from "./TurbotErrors";

class TurbotErrorsContainer extends Component {
  state = {
    errors: this.props.errors
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleCloseError = errorIndex => {
    const errorsBefore = this.state.errors.slice(0, errorIndex);
    const errorsAfter = this.state.errors.slice(
      errorIndex + 1,
      this.state.errors.length
    );

    this.setState({
      errors: [...errorsBefore, ...errorsAfter]
    });
  };

  render() {
    return (
      <TurbotErrors
        {...this.props}
        errors={this.state.errors}
        onCloseError={this.handleCloseError}
      />
    );
  }
}

export default TurbotErrorsContainer;
