const TurbotLogoWrapperStyles = theme => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.appBar.backgroundColor,
    borderBottom: `1px solid ${theme.palette.appBar.divider}`,
    borderRight: `1px solid ${theme.palette.appBar.divider}`,
    display: "flex",
    height: 66,
    minHeight: 66,
    maxHeight: 66,
    justifyContent: "space-between",
    padding: "0 1.6rem 0 1.7rem",
    minWidth: 300
  }
});

export default TurbotLogoWrapperStyles;
