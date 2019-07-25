import React from "react";
import PropTypes from "prop-types";
import SplitterLayout from "react-splitter-layout";
import TurbotSplitterLayoutStyles from "./TurbotSplitterLayout.styles";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-splitter-layout/lib/index.css";

const propTypes = {
  percentage: PropTypes.bool,
  primaryMinSize: PropTypes.number,
  secondaryMinSize: PropTypes.number,
  secondaryInitialSize: PropTypes.number
};

const TurbotSplitterLayout = ({
  children,
  classes,
  percentage,
  primaryMinSize = 50,
  secondaryMinSize = 20,
  secondaryInitialSize = 35
}) => {
  return (
    <SplitterLayout
      customClassName={classes.root}
      percentage
      primaryMinSize={primaryMinSize}
      secondaryMinSize={secondaryMinSize}
      secondaryInitialSize={secondaryInitialSize}
    >
      {children}
    </SplitterLayout>
  );
};

TurbotSplitterLayout.propTypes = propTypes;

export default withStyles(TurbotSplitterLayoutStyles)(TurbotSplitterLayout);
