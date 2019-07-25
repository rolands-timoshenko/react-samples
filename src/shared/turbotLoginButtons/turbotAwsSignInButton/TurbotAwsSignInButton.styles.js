const TurbotAwsSignInButtonStyles = theme => ({
  button__root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.cloud.aws}`,
    color: `${theme.palette.cloud.aws} !important`,
    padding: "3px 5px",
    textTransform: "none",
    minWidth: "6rem",
    "&:hover": {
      backgroundColor: theme.palette.cloud.aws,
      border: `1px solid ${theme.palette.cloud.aws}`,
      color: `${theme.palette.common.white} !important`
    }
  }
});

export default TurbotAwsSignInButtonStyles;
