const TurbotModalTitleStyles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  title: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.card.header.fontFamily,
    fontSize: theme.typography.h6.fontSize
  },
  closeButton: {
    padding: theme.spacing.unit,
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey.icon,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.grey["40"]
    }
  }
});

export default TurbotModalTitleStyles;
