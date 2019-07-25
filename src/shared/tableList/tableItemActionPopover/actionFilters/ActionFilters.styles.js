const ResourceFiltersStyles = theme => ({
  root: {
    padding: "5px 0 5px"
  },
  typography__root: {
    fontWeight: theme.typography.fontWeightMedium
  },
  tableBody__root: {
    "&--last": {
      borderBottom: `1px solid ${theme.palette.grey["200"]}`
    }
  },
  tableRow__root: {
    height: 20
  },
  tableCell__root: {
    borderBottom: "none",
    paddingTop: 15,
    paddingBottom: 5,
    "&:first-child": {
      textAlign: "right",
      paddingRight: 5
    }
  }
});

export default ResourceFiltersStyles;
