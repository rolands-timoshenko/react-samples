import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotCancelButton from "../turbotButton2/TurbotCancelButton";
import TurbotUpdateButton from "../turbotButton2/TurbotUpdateButton";
import TurbotModal from "../turbotModal/TurbotModal";
import TurbotModalContent from "../turbotModal/TurbotModalContent";
import TurbotModalFooter from "../turbotModal/TurbotModalFooter";
import TurbotModalTitle from "../turbotModal/TurbotModalTitle";
import TurbotDeleteButton from "../turbotButton2/TurbotDeleteButton";

const propTypes = {
  title: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  canUpdate: PropTypes.bool,
  isActive: PropTypes.bool,
  alert: PropTypes.element,
  processing: PropTypes.bool
};

const TurbotStatusUpdateDialog = ({
  title,
  isActive,
  canUpdate,
  onClose,
  onUpdate,
  processing,
  alert
}) => {
  const action = isActive ? "Deactivate" : "Activate";

  return (
    <TurbotModal onClose={onClose} open={true}>
      <TurbotModalTitle>
        {action}&nbsp;
        {title}
      </TurbotModalTitle>
      <TurbotModalContent>
        {alert && <div style={{ marginBottom: 20 }}>{alert}</div>}
        <Typography variant="body1">
          {action} <strong>{title}</strong>
          &nbsp;?
        </Typography>
      </TurbotModalContent>
      <TurbotModalFooter>
        <TurbotCancelButton onClick={onClose} />
        {!isActive ? (
          <TurbotUpdateButton
            disabled={processing || !canUpdate}
            onClick={onUpdate}
            title={"Activate"}
          />
        ) : (
          <TurbotDeleteButton
            disabled={processing || !canUpdate}
            onClick={onUpdate}
            title={"Deactivate"}
          />
        )}
      </TurbotModalFooter>
    </TurbotModal>
  );
};

TurbotStatusUpdateDialog.propTypes = propTypes;

export default TurbotStatusUpdateDialog;
