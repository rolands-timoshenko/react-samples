const TurbotNotificationStyles = theme => ({
  expansionPanel__root: {
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey["300"]}`,
    "&:before": {
      display: "none"
    }
  },
  expansionPanelSummary__root: {
    padding: "0 20px"
  },
  expansionPanelSummary__content: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  expansionPanelSummary__expanded: {
    backgroundColor: theme.palette.grey["50"]
  },
  expansionPanelDetails__root: {
    padding: "0 0 0",
    display: "block",
    borderTop: `1px solid ${theme.palette.grey["300"]}`
  },
  typography__root: {
    "&--active": {
      fontWeight: theme.typography.fontWeightMedium
    }
  }
});

export default TurbotNotificationStyles;
