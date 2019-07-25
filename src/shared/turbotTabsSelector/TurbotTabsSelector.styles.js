const TurbotTabsSelectorStyles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.grey["300"]}`,
    width: "100%",
    "&--fixed": {
      position: "absolute",
      backgroundColor: "white",
      zIndex: 999
    }
  },
  tabs__root: {
    minHeight: 25
  },
  tabs__indicator: {
    backgroundColor: theme.palette.common.turbot
  },
  tab__root: {
    minHeight: 25,
    minWidth: 50,
    textTransform: "capitalize"
  },
  tab__small: {
    padding: "3px 12px",
    fontSize: theme.typography.body2.fontSize
  },
  tab__xs: {
    padding: "4px",
    fontSize: theme.typography.body2.fontSize
  },
  turbotButtonSelect__button: {
    textTransform: "capitalize"
  }
});

export default TurbotTabsSelectorStyles;
