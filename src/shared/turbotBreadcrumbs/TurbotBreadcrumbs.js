import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TurbotDialogBreadcrumbLink from "../turbotDialogBreadcrumbLink/TurbotDialogBreadcrumbLink";
import TurbotBreadcrumbsStyles from "./TurbotBreadcrumbs.styles";
import TurbotTooltip from "../turbotTooltip/TurbotTooltip";

const TypeBreadcrumbs = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string
});

const propTypes = {
  breadcrumbs: PropTypes.arrayOf(TypeBreadcrumbs),
  links: PropTypes.bool
};

const TurbotBreadcrumbs = ({ classes, breadcrumbs, links = true }) => {
  const renderBreadCrumbsAsLinks = breadcrumbs => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return null;
    }
    const links = breadcrumbs
      .filter(item => !!item.label)
      .map((item, index) => (
        <TurbotDialogBreadcrumbLink
          item={item}
          key={`${item.value}-${index}`}
        />
      ))
      .reduce((prev, current, index) => {
        const prevVal = Array.isArray(prev) ? [...prev] : [prev];
        return [...prevVal, <span key={`chevron-${index}`}> > </span>, current];
      });
    return links;
  };
  const renderBreadCrumbsAsText = breadcrumbs => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return null;
    }
    const links = breadcrumbs
      .filter(item => !!item.label)
      .map((item, index) => (
        <span key={`${item.value}-${index}`}>
          {breadcrumbs[index + 1] ? `${item.label}` : `${item.label}\u200E`}
        </span>
      ))
      .reduce((prev, current, index) => {
        const prevVal = Array.isArray(prev) ? [...prev] : [prev];
        return [...prevVal, <span key={`chevron-${index}`}> > </span>, current];
      });
    return links;
  };

  const text = links
    ? renderBreadCrumbsAsLinks(breadcrumbs)
    : renderBreadCrumbsAsText(breadcrumbs);

  return (
    <TurbotTooltip title={text}>
      <span className={classes.root}>{text}</span>
    </TurbotTooltip>
  );
};

TurbotBreadcrumbs.propTypes = propTypes;

export default withStyles(TurbotBreadcrumbsStyles)(TurbotBreadcrumbs);
