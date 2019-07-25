import React, { Component } from "react";
import TurbotModalForm from "./TurbotModalForm";
import _ from "lodash";

class TurbotModalFormContainer extends Component {
  state = {
    errors: {},
    hasErrors: false,
    hasAllRequiredFieldsFilled: false
  };

  fieldRequired = field => {
    const isFieldSecret = _.get(field, "secret", false);
    const isSecretEdit = isFieldSecret && !this.props.isCreate;
    return !!(field.required && !isSecretEdit);
  };

  validateField = (field, value) => {
    if (!field.required && !value) {
      return null;
    }
    let error = null;

    if (this.fieldRequired(field) && !value) {
      error = "Value required";
    } else if (field.type === "string") {
      if (field.minLength && value.length < field.minLength) {
        error = `Must be ${field.minLength} characters or more`;
      }
      if (field.maxLength && value.length > field.maxLength) {
        error = `Must be ${field.maxLength} characters or less`;
      }
    } else if (field.type === "integer") {
      if (field.minimum && value < field.minimum) {
        error = `Must be ${field.minimum} or more`;
      } else if (field.maximum && value > field.maximum) {
        error = `Must be ${field.maximum} or less`;
      }
    } else if (field.type === "datetime-local") {
      if (value.length < 16) error = `Must be a valid datetime string`;
    }
    if (field.pattern) {
      const pattern = new RegExp(field.pattern);
      const valid = pattern.test(value);
      if (!valid) {
        error = `Must match pattern ${field.pattern}`;
      }
    }
    return error;
  };

  handleValidateAll = formState => {
    const errors = {};
    this.props.config.fields.forEach(field => {
      const error = this.validateField(field, formState.values[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });
    const hasErrors = Object.entries(errors).length > 0;
    this.setState({
      errors,
      hasErrors
    });
    return !hasErrors;
  };

  handleSubmit = formState => {
    const valid = this.handleValidateAll(formState);
    if (!valid) {
      return;
    }
    formState && this.props.onSubmit(formState);
  };

  checkAllRequiredFieldsHasValue = (formState, config) => {
    let filledRequiredFields = config.fields.filter(field => {
      return this.fieldRequired(field) && formState.values[field.name];
    });
    let numberOfRequiredFields = config.fields.filter(field => {
      return this.fieldRequired(field) === true;
    });
    if (filledRequiredFields.length === numberOfRequiredFields.length) {
      this.setState({
        hasAllRequiredFieldsFilled: true
      });
    } else {
      this.setState({
        hasAllRequiredFieldsFilled: false
      });
    }
  };

  handleFormChange = formState => {
    this.checkAllRequiredFieldsHasValue(formState, this.props.config);
    this.setState({
      hasErrors: formState.hasErrors
    });
  };

  render() {
    const disableSubmit =
      this.props.submitting ||
      this.state.hasErrors ||
      !this.state.hasAllRequiredFieldsFilled;

    return (
      <TurbotModalForm
        {...this.props}
        title={this.props.title}
        onClose={this.props.onClose}
        onFormChange={this.handleFormChange}
        disableSubmit={disableSubmit}
        submitButtonText={this.props.submitButtonText}
        submitError={this.props.submitError}
        onCloseError={this.props.onCloseError}
        formContainer={this.props.formContainer}
        onSubmit={this.handleSubmit}
        hasErrors={this.state.hasErrors}
        error={this.state.errors}
        hasCancelButton={this.props.hasCancelButton}
      />
    );
  }
}

export default TurbotModalFormContainer;
