import React from "react";
import logo from "../../../assets/turbot-icon-wordmark-400x91.png";
import TurbotLogoStyles from "./TurbotLogo.styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { UI_URLS } from "../../../config/urls";

const TurbotLogo = ({ classes }) => {
  return (
    <Link className={classes.link} to={UI_URLS.HOME}>
      <img className={classes.logo} src={logo} alt="logo" />
    </Link>
  );
};

export default withStyles(TurbotLogoStyles)(TurbotLogo);
