import React from "react";
import TurbotAlert, { AlertTypes } from "../turbotAlert/TurbotAlert";
import TurbotCancelButton from "../turbotButton2/TurbotCancelButton";
import TurbotCreateButton from "../turbotButton2/TurbotCreateButton";
import TurbotFormContainer from "../turbotForm/TurbotFormContainer";
import TurbotModal from "../turbotModal/TurbotModal";
import TurbotModalContent from "../turbotModal/TurbotModalContent";
import TurbotModalFooter from "../turbotModal/TurbotModalFooter";
import TurbotModalTitle from "../turbotModal/TurbotModalTitle";

class TurbotModalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: null
    };
  }

  render() {
    const {
      isCreate,
      onClose,
      title,
      onSubmit,
      disableSubmit,
      submitButtonText,
      onFormChange,
      submitText,
      config,
      values,
      submitting,
      submitError,
      onCloseError,
      hasCancelButton,
      error,
      prefixItem,
      prefixItemDeterminate
    } = this.props;

    return (
      <TurbotModal onClose={onClose} open={true}>
        <TurbotModalTitle onClose={onClose}>{title}</TurbotModalTitle>
        <TurbotModalContent>
          {prefixItem && prefixItem}
          <TurbotFormContainer
            isCreate={isCreate}
            onFormChange={data => {
              this.setState({ formState: data });
              onFormChange(data);
            }}
            config={config}
            values={values}
            submitText={submitText}
            submitting={submitting}
            errors={error}
          />
          {submitError && (
            <TurbotAlert
              message={submitError}
              type={AlertTypes.DANGER}
              onClose={onCloseError}
            />
          )}
        </TurbotModalContent>
        <TurbotModalFooter>
          {hasCancelButton && <TurbotCancelButton onClick={onClose} />}
          <TurbotCreateButton
            onClick={() => onSubmit(this.state.formState)}
            disabled={disableSubmit || !this.state.formState}
            title={submitButtonText}
          />
        </TurbotModalFooter>
      </TurbotModal>
    );
  }
}

export default TurbotModalForm;
