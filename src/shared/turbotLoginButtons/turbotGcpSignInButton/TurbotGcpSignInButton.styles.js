const TurbotGcpSignInButtonStyles = theme => ({
  button__root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.cloud.gcp}`,
    color: `${theme.palette.cloud.gcp} !important`,
    padding: "3px 5px",
    minWidth: "6rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.cloud.gcp,
      color: `${theme.palette.common.white} !important`
    }
  }
});

export default TurbotGcpSignInButtonStyles;
