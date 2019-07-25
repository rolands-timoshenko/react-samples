const TurbotToggleButtonStyles = theme => ({
  root: {
    "&.btn-turbot-default": {
      border: `1px solid ${theme.palette.grey["300"]}`,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      "&.active, &:active": {
        backgroundColor: `${theme.palette.grey["200"]}`,
        border: `1px solid ${theme.palette.grey["300"]}`,
        color: theme.palette.text.primary
      }
    }
  }
});

export default TurbotToggleButtonStyles;
