const TurbotErrorHandlerPageMessageStyles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.general,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontStyle: "italic",
    padding: 10,
    "& span": {
      color: theme.palette.secondary.main,
      cursor: "pointer"
    }
  },
  errorList: {
    padding: 10,
    marginLeft: 20,
    fontStyle: "italic",
    marginBottom: 0,
    color: theme.palette.error.main
  }
});

export default TurbotErrorHandlerPageMessageStyles;
