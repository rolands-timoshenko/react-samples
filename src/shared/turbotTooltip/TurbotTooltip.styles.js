const TurbotTooltipStyles = theme => {
  return {
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      fontSize: theme.typography.body2.fontSize,
      wordBreak: "break-word"
    }
  };
};

export default TurbotTooltipStyles;
