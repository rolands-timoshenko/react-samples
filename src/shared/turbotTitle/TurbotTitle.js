import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import TurbotTooltip from "../turbotTooltip/TurbotTooltip";
import TurbotTitleStyles from "./TurbotTitle.styles";
import ReactDOMServer from "react-dom/server";

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  customTooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  tooltipPlacement: PropTypes.oneOf([
    "top",
    "bottom",
    "bottom-start",
    "top-start"
  ]),
  showTooltip: PropTypes.bool,
  tooltipCmp: PropTypes.element
};

const TurbotTitle = ({
  classes,
  children,
  tooltipCmp,
  showTooltip = true,
  tooltipPlacement = "bottom-start",
  tooltipTextLength = 400,
  tooltipTextAsString = false,
  customClass,
  customTooltip
}) => {
  const transformChildrenForTooltip = children => {
    try {
      // Lets get static html string as children is react element currently
      let htmlString = ReactDOMServer.renderToString(children);
      // Lets strip out all html tags, as we don't need it inside tooltip
      htmlString = htmlString.replace(/(<([^>]+)>)/gi, "");
      return htmlString;
    } catch (error) {
      console.info(error);
      return children;
    }
  };

  const prepareTooltipText = () => {
    if (tooltipTextAsString) {
      if (customTooltip) return transformChildrenForTooltip(customTooltip);
      else return transformChildrenForTooltip(children);
    }
    if (customTooltip) return customTooltip;
    return children;
  };

  const renderWithTooltip = () => {
    let tooltipText = prepareTooltipText();
    if (tooltipText.length > tooltipTextLength)
      tooltipText = `${tooltipText.substring(0, tooltipTextLength).trim()}...`;

    if (tooltipCmp) {
      return React.cloneElement(tooltipCmp, {
        title: tooltipText,
        placement: tooltipPlacement,
        children: renderChildren()
      });
    } else {
      return (
        <TurbotTooltip placement={tooltipPlacement} title={tooltipText}>
          {renderChildren()}
        </TurbotTooltip>
      );
    }
  };

  const renderChildren = () => {
    return (
      <span className={`${classes.root} ${customClass ? customClass : ""}`}>
        <span>{children}</span>
      </span>
    );
  };

  return tooltipCmp || showTooltip || customTooltip
    ? renderWithTooltip()
    : renderChildren();
};

TurbotTitle.propTypes = propTypes;

export default withStyles(TurbotTitleStyles)(TurbotTitle);
