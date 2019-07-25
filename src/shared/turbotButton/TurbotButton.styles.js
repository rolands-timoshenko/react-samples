const TurbotButtonStyles = theme => ({
  root: {
    textTransform: "capitalize"
  },
  contained: {
    boxShadow: "none"
  },
  containedPrimary: {},
  outlined: {
    "&--invert": {
      "&:hover": {
        backgroundColor: "currentColor",
        "& span": {
          color: "white"
        }
      }
    }
  },
  outlinedSecondary: {},
  textSecondary: {},
  sizeSmall: {
    fontSize: theme.typography.body2.fontSize,
    padding: "5px 8px",
    minHeight: 27
  }
});

export default TurbotButtonStyles;
