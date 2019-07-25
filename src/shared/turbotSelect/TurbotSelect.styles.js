const TurbotSelectStyles = theme => ({
  root: {
    padding: "0.75rem 0.9rem",
    cursor: "pointer",
    display: "inline-block"
  },
  typography__root: {
    color: theme.palette.grey.icon,
    whiteSpace: "pre",
    "&:hover": {
      color: theme.palette.grey["800"]
    }
  },
  typography_body2: {
    fontSize: theme.typography.label.fontSize
  },
  menuItemIcon: {
    minWidth: "1.25em"
  },
  menuItemLabel: {
    padding: "0 3px",
    marginRight: "1.25em"
  },
  selected: {
    color: theme.palette.grey["900"]
  }
});

export default TurbotSelectStyles;
