const TurbotBreadcrumbsStyles = theme => ({
  root: {
    color: theme.palette.grey["600"],
    "& a": {
      // color: theme.palette.secondary.main,
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  }
});

export default TurbotBreadcrumbsStyles;
