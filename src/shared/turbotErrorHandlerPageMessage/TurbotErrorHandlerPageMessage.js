import { UI_URLS } from "./../../config/urls";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TurbotErrorHandlerPageMessageStyles from "./TurbotErrorHandlerPageMessage.styles";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import TurbotPopover from "../turbotPopover/TurbotPopover";
import PageContent from "../../layout/pageContent/PageContent";

const propTypes = {};

const TurbotErrorHandlerPageMessage = ({
  classes,
  onReset,
  history,
  errorHandler
}) => {
  const [linkRef, setLinkRef] = useState(null);

  const goHome = () => {
    // FIXME: redirect to last working page
    history.push(UI_URLS.HOME);
  };

  const showErrorDetails = e => {
    setLinkRef(e.target);
  };

  return (
    <PageContent>
      <div className={classes.root}>
        <Typography variant="subtitle1">
          Something went wrong! &nbsp;
          <br />
          <span onClick={showErrorDetails}>Click here for details.</span>
          {linkRef && (
            <TurbotPopover
              onClose={() => setLinkRef(null)}
              anchorEl={linkRef}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <ul className={classes.errorList}>
                {errorHandler.getErrorMessages().map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </TurbotPopover>
          )}
        </Typography>
      </div>
    </PageContent>
  );
};

TurbotErrorHandlerPageMessage.propTypes = propTypes;

const enhance = compose(
  withStyles(TurbotErrorHandlerPageMessageStyles),
  withRouter,
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotErrorHandlerPageMessage);
