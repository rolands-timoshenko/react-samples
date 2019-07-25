const TurbotAppBarStyles = theme => {
  const baseStyles = {
    alignItems: "center",
    backgroundColor: theme.palette.appBar.backgroundColor,
    borderBottom: `1px solid ${theme.palette.appBar.divider}`,
    boxShadow: "none",
    color: "#222222",
    display: "flex",
    height: "66px",
    minHeight: 66,
    width: "100%"
  };
  return {
    root: {
      display: "flex",
      minHeight: 66
    },
    appBarWithLogo: {
      ...baseStyles,
      justifyContent: "space-between"
    },
    appBar: {
      ...baseStyles,
      justifyContent: "space-between"
    },
    logoContainer: {
      alignItems: "center",
      backgroundColor: theme.palette.appBar.backgroundColor,
      borderBottom: `1px solid ${theme.palette.appBar.divider}`,
      borderRight: `1px solid ${theme.palette.appBar.divider}`,
      display: "flex",
      height: "66px",
      justifyContent: "space-between",
      padding: "0 1.6rem 0 1.2rem",
      width: "300px"
    },
    rightContainer: {
      alignItems: "center",
      display: "flex",
      flex: "auto",
      justifyContent: "space-between",
      paddingLeft: "1.6rem"
    }
  };
};

export default TurbotAppBarStyles;
