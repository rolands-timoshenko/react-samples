const TurbotLoaderStyles = theme => ({
  root: {
    "&--inline": {
      display: "inline-block",
      "& svg": {
        verticalAlign: "sub"
      }
    },
    "&--block": {
      display: "block",
      textAlign: "center",
      padding: 10,
      "& svg": {
        verticalAlign: "top"
      }
    },
    color: theme.palette.grey["500"]
  }
});

export default TurbotLoaderStyles;
