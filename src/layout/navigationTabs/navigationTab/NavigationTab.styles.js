const NavigationTabStyles = theme => {
  return {
    tab: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: theme.palette.text.breadcrumb,
      cursor: "pointer",
      marginBottom: "-1px",
      padding: "13px 20px"
    },
    tabSelected: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.palette.common.white,
      borderLeft: `1px solid ${theme.palette.appBar.divider}`,
      borderRight: `1px solid ${theme.palette.appBar.divider}`,
      borderTop: `2px solid ${theme.palette.common.turbot}`,
      cursor: "pointer",
      marginBottom: "-1px",
      padding: "11px 19px 13px 19px"
    }
  };
};

export default NavigationTabStyles;
