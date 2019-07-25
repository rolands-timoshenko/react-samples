import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import PropTypes from "prop-types";
import TurbotTabsSelectorStyles from "./TurbotTabsSelector.styles";
import { withStyles } from "@material-ui/core";

export const TypeSelectorTabs = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
});

const propTypes = {
  tabs: PropTypes.arrayOf(TypeSelectorTabs).isRequired,
  selectedTab: TypeSelectorTabs,
  onSelectTab: PropTypes.func,
  variant: PropTypes.oneOf(["standard", "fullWidth", "scrollable"])
};

const TurbotTabsSelector = ({
  classes,
  tabs,
  selectedTab,
  onSelectTab,
  fixed = false,
  tabSize,
  actions,
  rootStyle,
  variant = "standard"
}) => {
  const getRootClass = () => {
    const classNames = [];
    classNames.push(classes.root);
    if (fixed) classNames.push(`${classes.root}--fixed`);
    return classNames.join(" ");
  };

  const tabsClasses = {
    root: classes.tabs__root,
    indicator: classes.tabs__indicator
  };
  const tabClasses = {
    root: classes.tab__root,
    labelContainer: classes[`tab__${tabSize}`]
  };
  return (
    <div className={getRootClass()} style={rootStyle}>
      <Tabs
        classes={tabsClasses}
        value={selectedTab.value}
        onChange={onSelectTab}
        variant={variant}
      >
        {tabs.map(tab => (
          <Tab
            classes={tabClasses}
            disableRipple
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      {actions}
    </div>
  );
};

TurbotTabsSelector.propTypes = propTypes;

export default withStyles(TurbotTabsSelectorStyles)(TurbotTabsSelector);
