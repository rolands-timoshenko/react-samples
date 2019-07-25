const TurbotMenuItemStyles = theme => ({
  root: {
    fontSize: theme.typography.label.fontSize,
    lineHeight: "1rem",
    padding: "0.4rem 0.6rem 0.4rem 0.6rem",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.grey["200"]}`
    },
    "&:focus": {
      backgroundColor: theme.palette.background.paper
    },
    "&:hover": {
      backgroundColor: theme.palette.grey["200"]
    }
  },
  selected: {
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.background.paper + " !important",
    "&:hover": {
      backgroundColor: theme.palette.grey["200"] + " !important"
    }
  }
});

export default TurbotMenuItemStyles;
