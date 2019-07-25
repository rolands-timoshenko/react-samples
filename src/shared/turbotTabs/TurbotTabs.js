import { withStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import TurbotTabsStyles from "./TurbotTabs.styles";

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const TurbotTabs = ({
  classes,
  value,
  onChange,
  rightSideButtons,
  children
}) => {
  return (
    <Tabs value={value} onChange={onChange} classes={classes}>
      {children}
      {rightSideButtons && (
        <div
          style={{
            alignSelf: "center",
            marginLeft: "auto"
          }}
        >
          {rightSideButtons}
        </div>
      )}
    </Tabs>
  );
};

TurbotTabs.propTypes = propTypes;

export default withStyles(TurbotTabsStyles)(TurbotTabs);
