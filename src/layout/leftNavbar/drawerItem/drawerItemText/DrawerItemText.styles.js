const DrawerItemTextStyles = theme => ({
  root: {
    padding: "0 5px 0 6px",
    "&:first-child": {
      paddingLeft: "6px"
    }
  },
  primary: {
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: "normal"
  }
});

export default DrawerItemTextStyles;
