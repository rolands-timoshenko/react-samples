const TabBadge = theme => ({
  tabBadge: {
    display: "inline-block"
  },

  tabBadge__badge: {
    // display: "inline-block",
    padding: "2px 8px",
    marginLeft: "6px",
    borderRadius: 7,
    fontSize: theme.typography.caption.fontSize,
    "&--default": {
      backgroundColor: theme.palette.grey["100"]
      // color: theme.palette.text.secondary
    },
    "&--error": {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark
    }
  }
});

export default TabBadge;
