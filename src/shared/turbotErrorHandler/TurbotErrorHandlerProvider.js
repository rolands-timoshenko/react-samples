import { ReactIsInDevelomentMode } from "../../utils/utils";
import PropTypes from "prop-types";
import React, { Component } from "react";

export const TurbotErrorContext = React.createContext({});

class TurbotErrorHandlerProvider extends Component {
  isProduction = false;

  static propTypes = {
    errorView: PropTypes.element
  };

  state = {
    error: null,
    info: null
  };

  setError = (error, info) => {
    this.setState({ error: error, info });
    if (!this.isProduction && (error || info)) {
      console.log(
        `%c TurbotErrorHandler says:`,
        "background: red; color: white; padding: 5px"
      );
      console.error(error);
      console.info(info);
      console.trace();
    }
  };

  getErrorMessages = () => {
    if (!this.state.error) return null;
    const errors = [];
    this.state.error.message && errors.push(this.state.error.message);
    if (this.state.error.graphQLErrors) {
      // FIXME: don't know actual strcuture of these errors
      //this.state.error.graphQLErrors.forEach(error => errors.push(error));
    }

    if (
      this.state.error.networkError &&
      this.state.error.networkError.result &&
      this.state.error.networkError.result.errors
    ) {
      this.state.error.networkError.result.errors.forEach(
        error => error.message && errors.push(error.message)
      );
    }
    return errors;
  };

  componentDidMount() {
    this.isProduction = !ReactIsInDevelomentMode(React);
  }

  componentDidCatch(error, info) {
    this.setError(error, info);
  }

  getErrorContext = () => ({
    error: this.state.error,
    info: this.state.info,
    setError: this.setError,
    getErrorMessages: this.getErrorMessages
  });

  renderChildrenWithError = () => {
    return this.props.errorView
      ? this.renderErrorView(this.props.errorView)
      : this.props.children;
  };

  renderErrorView = element => {
    return React.cloneElement(element, {
      onReset: () => this.setError(null, null)
    });
  };

  render() {
    return (
      <TurbotErrorContext.Provider value={this.getErrorContext()}>
        {this.state.error
          ? this.renderChildrenWithError()
          : this.props.children}
      </TurbotErrorContext.Provider>
    );
  }
}

export default TurbotErrorHandlerProvider;
