const BrowseSelectedStyles = theme => ({
  drawerItem__root: {
    fontSize: theme.typography.body1.fontSize,
    paddingLeft: 5,
    paddingTop: "0.3125rem",
    paddingBottom: "0.3125rem",
    minHeight: 0,
    marginTop: 0,
    marginRight: "13px",
    marginBottom: 0
  },
  drawerItemText__root: {
    padding: 0
  },
  drawerItemText__primary: {
    fontSize: theme.typography.body1.fontSize,
    padding: "0.45rem 0 0.45rem 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});

export default BrowseSelectedStyles;
