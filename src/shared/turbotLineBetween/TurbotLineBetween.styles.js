const TurbotLineBetweenStyles = theme => ({
  root: {
    position: "relative"
  },
  svg: {
    position: "absolute",
    zIndex: 9999,
    "& path": {
      fill: "none",
      stroke: "#000",
      strokeWidth: 2
    },
    "& marker path": {
      stroke: "none",
      fill: "#000"
    }
  }
});

export default TurbotLineBetweenStyles;
