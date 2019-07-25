const TurbotSplitterLayoutStyles = theme => {
  return {
    root: {
      padding: "inherit",
      paddingBottom: 5,
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      "& .layout-splitter": {
        height: "auto",
        margin: "0 15px"
      },
      "& .layout-pane": {
        height: "100%",
        overflow: "scroll"
      }
    }
  };
};

export default TurbotSplitterLayoutStyles;
