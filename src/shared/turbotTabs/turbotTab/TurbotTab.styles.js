const TurbotTabStyles = theme => ({
  root: {
    marginRight: 32,
    paddingLeft: 2,
    paddingRight: 1,
    fontSize: theme.typography.body2.fontSize,
    minWidth: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.body2.fontSize
    }
  },
  textColorInherit: {
    color: theme.palette.text.secondary,
    opacity: 1
  },
  label: {
    color: theme.palette.text.secondary
  },
  labelIcon: {
    minHeight: 67,
    paddingTop: 0
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  labelContainer: {
    marginLeft: 9,
    padding: "0.1rem 0 0",
    [theme.breakpoints.up("md")]: {
      padding: "0.1rem 0 0"
    }
  },
  tab__icon: {
    fontSize: theme.typography.subtitle1.fontSize,
    vertialAlign: "middle"
  }
});
export default TurbotTabStyles;
