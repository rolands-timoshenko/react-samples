const TableItemTitleStyles = theme => ({
  root: {
    "& a": {
      // color: theme.palette.secondary.main,
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  },
  title__root__clickable: {
    color: theme.palette.secondary.main,
    cursor: "pointer"
  },
  title__root__filter: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
    marginBottom: 0,
    position: "relative"
  },
  title__root: {
    marginBottom: "0.2em"
  },
  title__body1: {
    lineHeight: "1rem",
    wordBreak: "break-all"
  },
  title__root__text: {
    color: theme.palette.grey["600"],
    cursor: "pointer",
    marginBottom: "0.2em"
  },
  icon_root: {
    fontSize: "0.4em",
    paddingLeft: 1
  }
});

export default TableItemTitleStyles;
