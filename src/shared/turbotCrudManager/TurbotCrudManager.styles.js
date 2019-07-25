const TurbotCrudManagerStyles = theme => {
  return {
    createRoot: {
      "&:hover": {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.green
      }
    },
    create: {
      backgroundColor: theme.palette.green,
      borderColor: theme.palette.green,
      color: theme.palette.common.white
    },
    edit: {
      borderColor: theme.palette.turbot.dark,
      color: theme.palette.turbot.dark
    },
    editRoot: {
      "&:hover": {
        backgroundColor: theme.palette.turbot.dark,
        color: theme.palette.common.white
      }
    },
    delete: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
      marginLeft: theme.spacing.unit
    },
    deleteRoot: {
      "&:hover": {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white
      }
    }
  };
};

export default TurbotCrudManagerStyles;
