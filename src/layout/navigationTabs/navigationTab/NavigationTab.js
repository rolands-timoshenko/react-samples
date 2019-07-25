import React from "react";
import NavigationTabStyles from "./NavigationTab.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const NavigationTab = ({ classes, children, selected, onTabClick }) => {
  return (
    <div
      className={selected ? classes.tabSelected : classes.tab}
      onClick={onTabClick}
    >
      {children}
    </div>
  );
};

export default withStyles(NavigationTabStyles)(NavigationTab);
