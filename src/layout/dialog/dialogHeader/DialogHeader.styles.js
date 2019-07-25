const DialogHeaderStyles = theme => ({
  root: {
    backgroundColor: theme.palette.itemView.header.backgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "1rem 2rem"
  },
  leftContext: {
    display: "flex",
    alignItems: "inherit",
    justifyContent: "space-between"
  },
  rightContext: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default DialogHeaderStyles;
