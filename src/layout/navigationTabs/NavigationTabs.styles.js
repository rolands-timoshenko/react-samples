const NavigationTabsStyles = theme => {
  return {
    innerContainer: {
      display: "flex",
      fontSize: theme.typography.body1.fontSize,
      width: "100%"
    },
    root: {
      borderBottom: `1px solid ${theme.palette.appBar.divider}`,
      marginTop: "1rem",
      padding: "0 1.3rem"
    },
    count: {
      fontWeight: theme.typography.fontWeightMedium,
      marginLeft: "6px"
    },
    labelSelected: {
      color: theme.palette.common.black,
      marginLeft: "6px"
    },
    label: {
      color: theme.palette.text.breadcrumb,
      marginLeft: "6px"
    }
  };
};

export default NavigationTabsStyles;
