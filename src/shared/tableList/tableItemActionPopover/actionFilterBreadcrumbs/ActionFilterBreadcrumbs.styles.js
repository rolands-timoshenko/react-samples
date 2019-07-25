const ResourceFilterBreadcrumbsStyles = theme => ({
  titleTypography__root: {
    color: theme.palette.grey["400"],
    textTransform: "uppercase",
    fontSize: 11,
    lineHight: 14
  },
  linkTypography__root: {
    color: theme.palette.text.breadcrumb,
    display: "inline-block",
    lineHight: 14
  },
  linkTypographyClickable__root: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
    display: "inline-block",
    lineHight: 14
  },
  turbotIcon__root: {
    fontSize: 7,
    paddingLeft: 1
  },
  tableRow__root: {
    height: 30,
    "&:last-child": {
      "& td": {
        paddingBottom: 15
      }
    }
  },
  tableCell__root: {
    verticalAlign: "middle",
    height: 25,
    borderBottom: "none",
    paddingTop: 5,
    paddingBottom: 5,
    color: theme.palette.grey["400"],
    "&:first-child": {
      textAlign: "right",
      paddingRight: 5,
      paddingLeft: 30
    },
    "&:last-child": {
      textAlign: "left",
      paddingLeft: 5,
      paddingRight: 30
    }
  }
});

export default ResourceFilterBreadcrumbsStyles;
