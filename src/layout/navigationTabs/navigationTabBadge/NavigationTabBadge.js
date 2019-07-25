import React from "react";
import NavigationTabBadgeStyles from "./NavigationTabBadge.styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const TypeNavigationTabBadge = PropTypes.shape({
  count: PropTypes.number
});

const propTypes = {
  alerts: TypeNavigationTabBadge
};

const NavigationTabBadge = ({ classes, alerts }) => {
  const alertsClassNames = [
    classes.tabBadge__badge,
    `${classes.tabBadge__badge}--error`
  ].join(" ");
  return (
    <div className={classes.tabBadge}>
      {alerts && (
        <span className={alertsClassNames} key="alerts">
          {alerts.count.toLocaleString("en")}
        </span>
      )}
    </div>
  );
};

NavigationTabBadge.propTypes = propTypes;

export default withStyles(NavigationTabBadgeStyles)(NavigationTabBadge);
