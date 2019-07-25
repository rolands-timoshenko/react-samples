const PageContentStyles = theme => ({
  root: {
    overflowY: "scroll",
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    paddingTop: "2rem",
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: "1rem",
    paddingRight: "1rem"
  },
  splitter: {
    position: "relative",
    alignItems: "stretch",
    "& .layout-splitter": {
      height: "auto",
      margin: "0 20px"
    },
    "& .layout-pane": {
      overflow: "scroll"
    }
  }
});

export default PageContentStyles;
