const TurbotErrorHandlerMessageStyles = theme => ({
  root: {
    fontStyle: "italic",
    padding: 10,
    "& span": {
      color: theme.palette.secondary.main,
      cursor: "pointer"
    }
  }
});

export default TurbotErrorHandlerMessageStyles;
