import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import PropTypes from "prop-types";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotNotificationStyles from "./TurbotNotification.styles";
import TurbotRelativeTime from "../turbotRelativeTime/TurbotRelativeTime";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

export const TypeTurbotNotification = PropTypes.shape({
  icon: PropTypes.element,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

const propTypes = {
  notification: TypeTurbotNotification.isRequired,
  isExpanded: PropTypes.bool,
  onChange: PropTypes.func,
  defaultExpanded: PropTypes.bool
};

const TurbotNotification = ({
  classes,
  notification,
  onChange,
  isExpanded,
  children,
  defaultExpanded = false
}) => {
  const expansionPanel = {
    root: classes.expansionPanel__root
  };

  const expansionPanelSummary = {
    content: classes.expansionPanelSummary__content,
    expanded: classes.expansionPanelSummary__expanded,
    root: classes.expansionPanelSummary__root
  };

  const expansionPanelDetails = {
    root: classes.expansionPanelDetails__root
  };

  const typographyClasses = {
    root: `${classes.typography__root} ${isExpanded &&
      classes.typography__root + "--active"}`
  };

  const handleChange = (evt, value) => onChange && onChange(value);

  const renderChildren = () => {
    return children;
  };

  return (
    <ExpansionPanel
      classes={expansionPanel}
      defaultExpanded={defaultExpanded}
      onChange={handleChange}
    >
      <ExpansionPanelSummary
        classes={expansionPanelSummary}
        expandIcon={
          <Typography variant="body1">
            <TurbotIcon icon={["fal", "angle-down"]} />
          </Typography>
        }
      >
        <Typography classes={typographyClasses} variant="body1">
          {notification.icon && notification.icon}
          &nbsp;&nbsp; <span>{notification.title}</span>
        </Typography>
        <Typography variant="caption">
          <TurbotRelativeTime timestamp={notification.time} highlightSecs={0} />
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={expansionPanelDetails}>
        {isExpanded && children && renderChildren()}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

TurbotNotification.propTypes = propTypes;

export default withStyles(TurbotNotificationStyles)(TurbotNotification);
