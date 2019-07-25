const TableListStyles = theme => ({
  turbotPaper: {
    "&__root": {
      border: `1px solid ${theme.palette.grey["300"]}`,
      boxShadow: "none",
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`
    }
  }
});

export default TableListStyles;
