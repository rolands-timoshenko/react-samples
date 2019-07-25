const TurbotAwsSignInButtonStyles = theme => ({
  button__root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.cloud.azure}`,
    color: `${theme.palette.cloud.azure} !important`,
    padding: "3px 6px",
    textTransform: "none",
    minWidth: "6rem",
    "&:hover": {
      backgroundColor: theme.palette.cloud.azure,
      color: `${theme.palette.common.white} !important`
    }
  }
});

export default TurbotAwsSignInButtonStyles;
