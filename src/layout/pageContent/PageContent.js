import { withStyles, withWidth } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import TurbotSplitterLayout from "../../shared/turbotSplitterLayout/TurbotSplitterLayout";
import PageContentStyles from "./PageContent.styles";

const propTypes = {
  withSplitter: PropTypes.bool,
  setRef: PropTypes.func
};

const PageContent = ({
  classes,
  width,
  children,
  withSplitter = false,
  splitterProps = {},
  setRef = () => {}
}) => {
  // FIXME: currently always show splitter
  const isXl = true; // width === "xl";
  const isLg = true; // width === "lg";

  const renderWithSplitter = () => {
    return (
      <TurbotSplitterLayout {...splitterProps}>{children}</TurbotSplitterLayout>
    );
  };

  const renderWithoutSplitter = () => {
    return <Fragment>{children}</Fragment>;
  };

  const render = () => {
    const content =
      withSplitter && (isLg || isXl)
        ? renderWithSplitter()
        : renderWithoutSplitter();
    return content;
  };

  return (
    <div ref={setRef} className={classes.root}>
      {render()}
    </div>
  );
};

PageContent.propTypes = propTypes;

export default withWidth()(withStyles(PageContentStyles)(PageContent));
