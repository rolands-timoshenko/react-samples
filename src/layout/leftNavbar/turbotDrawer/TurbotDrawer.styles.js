const TurbotDrawerStyles = theme => ({
  content: {
    overflowY: "scroll"
  },
  docked: {
    height: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.general
  },
  dragger: {
    width: "1px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: "100",
    backgroundColor: theme.palette.appBar.divider
  },
  paper: {
    backgroundColor: "transparent",
    height: "100%",
    overflowY: "hidden",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  paperAnchorDockedLeft: {
    borderRight: "none"
  }
});

export default TurbotDrawerStyles;
