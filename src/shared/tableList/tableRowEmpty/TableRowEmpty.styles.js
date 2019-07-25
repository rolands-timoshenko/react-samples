const TableRowEmptyStyles = theme => ({
  emptyMessage: {
    color: theme.palette.grey["700"],
    fontStyle: "italic"
  },
  reset: {
    color: theme.palette.secondary.main,
    cursor: "pointer"
  },
  row: {
    height: "auto"
  }
});

export default TableRowEmptyStyles;
