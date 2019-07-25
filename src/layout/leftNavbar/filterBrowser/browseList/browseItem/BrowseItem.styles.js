const BrowseItemStyles = theme => ({
  root: {
    fontSize: theme.typography.body1.fontSize,
    padding: "0.45rem 0 0.45rem 0"
  },
  rootClickable: {
    cursor: "pointer",
    fontSize: theme.typography.body1.fontSize,
    padding: "0.45rem 0 0.45rem 0"
  },
  icon: {
    display: "inline-block",
    paddingRight: "0.4em",
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  title: {
    width: "100%",
    lineHeight: "1.25",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  titleClickable: {
    width: "100%",
    color: theme.palette.secondary.main,
    lineHeight: "1.25",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

export default BrowseItemStyles;
