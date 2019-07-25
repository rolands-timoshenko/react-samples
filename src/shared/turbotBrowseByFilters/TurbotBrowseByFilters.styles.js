const TurbotBrowseByFiltersStyles = theme => ({
  root: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "0.7rem"
  },
  textTitle: {
    color: theme.palette.text.breadcrumb
  },
  iconWrapper: {
    textAlign: "center",
    width: "3rem"
  },
  turbotIcon: {
    marginRight: "0.6rem",
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.text.primary
  }
});

export default TurbotBrowseByFiltersStyles;
