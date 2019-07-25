const TurbotBrowseByContextStyles = theme => {
  return {
    buttonContainer: {
      alignItems: "baseline",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    breadcrumbsContainer: {
      alignItems: "center",
      display: "flex"
    },
    loginButton: {
      marginLeft: "1rem"
    },
    root: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      minHeight: "3rem"
    }
  };
};

export default TurbotBrowseByContextStyles;
