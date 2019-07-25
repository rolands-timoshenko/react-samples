const TurbotIconStyles = theme => ({
  root: {
    "& path": {
      fill: "currentColor"
    },
    // When icon is used as child in c3 container. C3 styles overrides svg element
    fontSize: "inherit",
    "&--xs": {
      fontSize: theme.typography.caption.fontSize
    },
    "&--small": {
      fontSize: theme.typography.body2.fontSize
    },
    "&--medium": {
      fontSize: theme.typography.body1.fontSize
    },
    "&--large": {
      fontSize: theme.typography.subtitle1.fontSize
    },
    "&--clickable": {
      cursor: "pointer"
    }
  }
});

export default TurbotIconStyles;
