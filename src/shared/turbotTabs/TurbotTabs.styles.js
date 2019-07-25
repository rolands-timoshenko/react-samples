const TurbotTabsStyles = theme => ({
  root: {
    width: "100%",
    overflow: "visible"
  },
  scroller: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  indicator: {
    height: 2,
    bottom: -1,
    backgroundColor: theme.palette.green,
    transition: "none"
  },
  fixed: {
    overflowY: "visible",
    overflowX: "visible"
  }
});

export default TurbotTabsStyles;
