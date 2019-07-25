const TurbotBrowseByFilterStyles = theme => {
  return {
    box: {
      alignItems: "center",
      border: `1px solid ${theme.palette.filter.chip}`,
      borderRadius: theme.shape.borderRadius,
      display: "inline-flex",
      marginRight: "1rem",
      padding: "0.3rem 0.7rem"
    },
    removeIcon: {
      color: theme.palette.filter.chip,
      cursor: "pointer",
      fontSize: theme.typography.body2.fontSize,
      marginLeft: "0.7em",
      width: theme.typography.body2.fontSize
    },
    text: {
      color: theme.palette.filter.chip,
      fontSize: theme.typography.body2.fontSize
    }
  };
};

export default TurbotBrowseByFilterStyles;
