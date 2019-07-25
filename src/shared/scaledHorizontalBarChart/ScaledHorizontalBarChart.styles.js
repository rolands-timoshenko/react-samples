const ScaledHorizontalBarChartStyles = theme => ({
  root: {
    width: "100%",
    height: 10,
    position: "relative",
    cursor: "pointer",
    marginBottom: "0.4em",
    paddingTop: "0.1em",
    "& div": {
      position: "absolute",
      height: "inherit"
    }
  },
  total: {
    zIndex: 1
  },
  recent: {
    zIndex: 2
  }
});

export default ScaledHorizontalBarChartStyles;
