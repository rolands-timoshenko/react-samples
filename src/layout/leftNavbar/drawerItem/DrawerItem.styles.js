const DrawerItemStyles = theme => ({
  root: {
    "&$selected": {
      backgroundColor: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.common.white
      }
    }
  },
  gutters: {
    margin: "7px 13px",
    width: "auto",
    padding: "10px 0",
    minHeight: 45,
    "&--topNarrow": {
      marginTop: 0,
      marginBottom: 7
    },
    "&--bottomNarrow": {
      marginBottom: 0,
      marginTop: 7
    }
  },
  selected: {
    backgroundColor: theme.palette.common.white
  },
  container: {
    listStyle: "none"
  }
});

export default DrawerItemStyles;
