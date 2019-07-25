const TurbotAlertStyles = theme => ({
  root: {
    //minWidth: 150,
    padding: "0.6em",
    // marginBottom: 20,
    border: "1px solid transparent",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&--error": {
      backgroundColor:
        theme.palette.itemView.header.control.alertState.backgroundColor,
      borderColor: theme.palette.error.dark,
      color: theme.palette.error.dark
    },
    "&--success": {
      backgroundColor:
        theme.palette.itemView.header.control.okState.backgroundColor,
      borderColor: `rgba(${theme.palette.alerts.success.rgb}, 0.3)`,
      color: `rgba(${theme.palette.alerts.success.rgb}, 1)`
    },
    "&--warning": {
      backgroundColor: `rgba(${theme.palette.alerts.warning.rgb}, 0.1)`,
      borderColor: `rgba(${theme.palette.alerts.warning.rgb}, 0.3)`,
      color: `rgba(${theme.palette.alerts.warning.rgb}, 1)`
    },
    "&--danger": {
      backgroundColor: `rgba(${theme.palette.alerts.danger.rgb}, 0.2)`,
      //borderColor: `rgba(${theme.palette.alerts.danger.rgb}, 0.3)`,
      color: `rgba(${theme.palette.alerts.danger.rgb}, 1)`
    },
    "&--info": {
      backgroundColor: `rgba(${theme.palette.alerts.info.rgb}, 0.2)`,
      borderColor: `rgba(${theme.palette.alerts.info.rgb}, 0.3)`,
      color: `rgba(${theme.palette.alerts.info.rgb}, 1)`
    }
  },
  text: {
    fontSize: theme.typography.body1.fontSize
  },
  close: {
    marginLeft: 10,
    padding: 0,
    border: 0,
    cursor: "pointer",
    fontWeight: theme.typography.fontWeightMedium,
    //lineHeight: "0.5",
    backgroundColor: "transparent",
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.7)",
    opacity: 0.4,
    "&:hover": {
      opacity: 0.7
    },
    "&--error": {
      color: theme.palette.error.dark
    },
    "&--danger": {
      color: `rgba(${theme.palette.alerts.danger.rgb}, 1)`
    }
  }
});

export default TurbotAlertStyles;
