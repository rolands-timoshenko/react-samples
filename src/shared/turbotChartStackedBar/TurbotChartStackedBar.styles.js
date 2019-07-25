const TurbotChartStackedBarStyles = theme => ({
  container: {
    position: "relative"
  },
  tooltip: {
    opacity: 0,
    position: "fixed",
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  chart: {
    cursor: "pointer"
  },
  chartText: {
    fill: theme.palette.summary.chart.common.total,
    fontSize: theme.typography.caption.fontSize
  }
});

export default TurbotChartStackedBarStyles;
