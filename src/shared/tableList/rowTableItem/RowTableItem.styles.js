const RowTableItemStyles = theme => ({
  row__root: {
    height: "auto"
  },
  row__hover: {
    cursor: "pointer",
    height: "auto"
  },
  row__noBottomBorder: {
    height: "auto",
    "&:last-child": {
      "& td, th": {
        borderBottom: "none"
      }
    }
  }
});

export default RowTableItemStyles;
