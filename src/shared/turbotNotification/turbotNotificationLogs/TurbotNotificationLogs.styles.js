const TurbotNotificationLogsStyles = theme => ({
  root: {
    maxHeight: 400,
    overflow: "auto"
  },
  noLogs: {
    "& span": {
      cursor: "pointer",
      color: theme.palette.secondary.main
    }
  }
});

export default TurbotNotificationLogsStyles;
