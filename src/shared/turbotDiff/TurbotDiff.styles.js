const TurbotDiffStyles = theme => ({
  root: {
    fontFamily: theme.typography.code.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: "transparent",
    border: 0,
    padding: 0,
    margin: 0,
    color: theme.palette.text.primary,
    "& del": {
      backgroundColor: "#ffeef0",
      textDecoration: "none"
    },
    "& add": {
      backgroundColor: "#e6ffed"
    }
  }
});

export default TurbotDiffStyles;
