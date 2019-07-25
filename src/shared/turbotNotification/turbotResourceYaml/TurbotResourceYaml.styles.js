const TurbotResourceYamlStyles = theme => ({
  root: {
    padding: "0.4em 0",
    overflow: "auto",
    boxShadow: "none",
    // border: `1px solid ${theme.palette.grey["300"]}`,
    display: "block"
  },
  code: {
    fontFamily: theme.typography.code.fontFamily,
    fontSize: theme.typography.body2.fontSize
  }
});

export default TurbotResourceYamlStyles;
