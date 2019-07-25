import React, { Fragment } from "react";
import NavigationTab from "./navigationTab/NavigationTab";
import NavigationTabBadge from "./navigationTabBadge/NavigationTabBadge";
import NavigationTabsStyles from "./NavigationTabs.styles";
import TurbotIcon from "../../shared/turbotIcon/TurbotIcon";
import { compose } from "react-apollo";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { TurbotNumberFormatter } from "../../utils/utils";

// Add badges to tab label if necessary
const renderContent = (classes, selected, tab, spinner, theme) => {
  if (tab.badges && spinner) {
    return (
      <Fragment>
        <TurbotIcon
          icon={["fal", "circle-notch"]}
          style={{ color: theme.palette.text.breadcrumb }}
          spin={spinner}
        />
        <span className={classes.label}>{tab.label}</span>
      </Fragment>
    );
  }
  if (!tab.badges || !tab.badges.total) {
    return (
      <Fragment>
        <TurbotIcon
          icon={[tab.icon.class, tab.icon.icon]}
          style={{ color: tab.icon.color }}
        />
        <span className={classes.label}>{tab.label}</span>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <TurbotIcon
        icon={[tab.icon.class, tab.icon.icon]}
        style={{ color: tab.icon.color }}
      />
      <span className={classes.count}>
        {TurbotNumberFormatter(tab.badges.total.count)}
      </span>
      <span className={selected ? classes.labelSelected : classes.label}>
        {tab.label}
      </span>
      <NavigationTabBadge alerts={tab.badges.alerts} />
    </Fragment>
  );
};

const NavigationTabs = ({
  classes,
  onTabClick,
  selectedTab,
  tabs,
  spinner,
  theme
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        {tabs.map(tab => {
          const selected = tab.selected(selectedTab);
          return (
            <NavigationTab
              key={tab.value}
              selected={tab.selected(selectedTab)}
              onTabClick={() => onTabClick(tab.value)}
            >
              {renderContent(classes, selected, tab, spinner, theme)}
            </NavigationTab>
          );
        })}
      </div>
    </div>
  );
};

const enhance = compose(
  withTheme(),
  withStyles(NavigationTabsStyles)
);

export default enhance(NavigationTabs);
