const LeftNavbarStyles = theme => {
  return {
    logoContainer: {
      backgroundColor: theme.palette.appBar.backgroundColor,
      borderBottom: `1px solid ${theme.palette.appBar.divider}`,
      alignItems: "center",
      display: "flex",
      height: "66px",
      justifyContent: "space-between",
      padding: "0 1.6rem 0 1.2rem",
      width: "100%"
    }
  };
};

export default LeftNavbarStyles;
