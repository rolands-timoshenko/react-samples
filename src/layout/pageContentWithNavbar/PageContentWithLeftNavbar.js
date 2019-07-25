import React from "react";
import { withStyles } from "@material-ui/core";
import PageContentWithLeftNavbarStyles from "./PageContentWithLeftNavbar.styles";

const PageContentWithLeftNavbar = ({ classes, children }) => {
  const renderChildren = (childrens, classes) => {
    return React.Children.map(childrens, (children, index) => {
      return index === 0
        ? React.cloneElement(children, { className: classes.leftContent })
        : React.cloneElement(children, { className: classes.rightContent });
    });
  };

  return (
    <div className={classes.root}>{renderChildren(children, classes)}</div>
  );
};

export default withStyles(PageContentWithLeftNavbarStyles)(
  PageContentWithLeftNavbar
);
