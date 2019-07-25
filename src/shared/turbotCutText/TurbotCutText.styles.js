const TurbotCutTexttyles = theme => ({
  root: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    "& > *": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    "&--parentFit": {
      position: "absolute",
      width: "100%",
      top: 0,
      left: 0
    }
  }
});

export default TurbotCutTexttyles;
